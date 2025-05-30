package com.tebutebu.apiserver.repository.paging.project;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.tebutebu.apiserver.domain.Project;
import com.tebutebu.apiserver.domain.ProjectRankingSnapshot;
import com.tebutebu.apiserver.domain.QProject;
import com.tebutebu.apiserver.dto.project.response.ProjectPageResponseDTO;
import com.tebutebu.apiserver.dto.snapshot.response.RankingItemDTO;
import com.tebutebu.apiserver.dto.tag.response.TagResponseDTO;
import com.tebutebu.apiserver.pagination.dto.request.ContextCursorPageRequestDTO;
import com.tebutebu.apiserver.pagination.dto.request.CursorTimePageRequestDTO;
import com.tebutebu.apiserver.pagination.factory.CursorPageSpec;
import com.tebutebu.apiserver.pagination.factory.CursorPageFactory;
import com.tebutebu.apiserver.pagination.internal.CursorPage;
import com.tebutebu.apiserver.repository.CommentRepository;
import com.tebutebu.apiserver.repository.ProjectRankingSnapshotRepository;
import com.tebutebu.apiserver.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ProjectPagingRepositoryImpl implements ProjectPagingRepository {

    private final ProjectRankingSnapshotRepository snapshotRepository;

    private final ProjectRepository projectRepository;

    private final CommentRepository commentRepository;

    private final CursorPageFactory cursorPageFactory;

    private final ObjectMapper objectMapper;

    private final QProject qProject = QProject.project;

    @Override
    public CursorPage<ProjectPageResponseDTO> findByRankingCursor(ContextCursorPageRequestDTO req) {
        ProjectRankingSnapshot snapshot = snapshotRepository.findById(req.getContextId())
                .orElseThrow(() -> new NoSuchElementException("snapshotNotFound"));

        List<RankingItemDTO> dtoList = parseSnapshotJson(snapshot);

        int start = calculateStartIndex(dtoList, req.getCursorId());
        int end = Math.min(start + req.getPageSize(), dtoList.size());

        List<Long> projectIds = dtoList.subList(start, end).stream()
                .map(RankingItemDTO::getProjectId)
                .collect(Collectors.toList());

        List<Project> projects = projectRepository.findAllById(projectIds).stream()
                .sorted(Comparator.comparingInt(p -> projectIds.indexOf(p.getId())))
                .toList();

        Map<Long, Long> commentCountMap = commentRepository.findCommentCountMap(projectIds);

        List<ProjectPageResponseDTO> projectPageResponseDtoList = projects.stream()
                .map(proj -> toPageResponseDTO(proj, commentCountMap))
                .collect(Collectors.toList());

        boolean hasNext = end < dtoList.size();
        Long nextCursorId = hasNext ? dtoList.get(end - 1).getProjectId() : null;

        return CursorPage.<ProjectPageResponseDTO>builder()
                .items(projectPageResponseDtoList)
                .nextCursorId(nextCursorId)
                .nextCursorTime(null)
                .hasNext(hasNext)
                .build();
    }

    @Override
    public CursorPage<ProjectPageResponseDTO> findByLatestCursor(CursorTimePageRequestDTO req) {
        BooleanBuilder where = new BooleanBuilder();
        OrderSpecifier<?>[] orderBy = new OrderSpecifier<?>[]{
                qProject.createdAt.desc(),
                qProject.id.desc()
        };

        CursorPageSpec<Project> spec = CursorPageSpec.<Project>builder()
                .entityPath(qProject)
                .where(where)
                .orderBy(orderBy)
                .createdAtExpr(qProject.createdAt)
                .idExpr(qProject.id)
                .cursorId(req.getCursorId())
                .cursorTime(req.getCursorTime())
                .pageSize(req.getPageSize())
                .build();
        CursorPage<Project> page = cursorPageFactory.create(spec);

        List<Long> projectIds = page.items().stream()
                .map(Project::getId)
                .collect(Collectors.toList());
        Map<Long, Long> commentCountMap = commentRepository.findCommentCountMap(projectIds);

        List<ProjectPageResponseDTO> projectPageResponseDtoList = page.items().stream()
                .map(proj -> toPageResponseDTO(proj, commentCountMap))
                .collect(Collectors.toList());

        return CursorPage.<ProjectPageResponseDTO>builder()
                .items(projectPageResponseDtoList)
                .nextCursorId(page.nextCursorId())
                .nextCursorTime(page.nextCursorTime())
                .hasNext(page.hasNext())
                .build();
    }

    private List<RankingItemDTO> parseSnapshotJson(ProjectRankingSnapshot snapshot) {
        try {
            Map<String, List<RankingItemDTO>> map = objectMapper.readValue(
                    snapshot.getRankingData(),
                    new TypeReference<>() {}
            );
            return map.get("projects");
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private int calculateStartIndex(List<RankingItemDTO> all, Long afterId) {
        if (afterId == null) {
            return 0;
        }
        for (int i = 0; i < all.size(); i++) {
            if (all.get(i).getProjectId().equals(afterId)) {
                return i + 1;
            }
        }
        return 0;
    }

    private ProjectPageResponseDTO toPageResponseDTO(Project proj, Map<Long, Long> commentCountMap) {
        return ProjectPageResponseDTO.builder()
                .id(proj.getId())
                .teamId(proj.getTeam().getId())
                .term(proj.getTeam().getTerm())
                .teamNumber(proj.getTeam().getNumber())
                .title(proj.getTitle())
                .introduction(proj.getIntroduction())
                .representativeImageUrl(proj.getRepresentativeImageUrl())
                .tags(proj.getTagContents().stream()
                        .map(t -> new TagResponseDTO(t.getContent()))
                        .toList())
                .commentCount(commentCountMap.getOrDefault(proj.getId(), 0L))
                .givedPumatiCount(proj.getTeam().getGivedPumatiCount())
                .receivedPumatiCount(proj.getTeam().getReceivedPumatiCount())
                .badgeImageUrl(proj.getTeam().getBadgeImageUrl())
                .createdAt(proj.getCreatedAt())
                .modifiedAt(proj.getModifiedAt())
                .build();
    }

}

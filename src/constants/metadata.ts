const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const METADATA = Object.freeze({
  ROOT_LAYOUT: {
    title: {
      default: '품앗이',
      template: '품앗이 | %s',
    },
    description:
      '카카오테크 부트캠프 교육생들을 위한 트래픽 품앗이 플랫폼, 품앗이는 프로젝트 홍보를 통해 교육생들이 서로의 성공을 함께 만들어가는 공간입니다.',
    keywords: [
      '카테부',
      '카카오 테크 부트캠프',
      '품앗이',
      '프로젝트 공유',
      '개발자 커뮤니티',
      '프로젝트 랭킹',
      '최신 프로젝트',
      '출석체크',
      '개발자 운세',
      '프로젝트 포트폴리오',
      '프로젝트 탐색',
    ].join(', '),
    metadataBase: new URL(BASE_URL!),
    openGraph: {
      title: {
        default: '품앗이',
        template: '품앗이 | %s',
      },
      description:
        '카카오테크 부트캠프 교육생들을 위한 트래픽 품앗이 플랫폼, 품앗이는 프로젝트 홍보를 통해 교육생들이 서로의 성공을 함께 만들어가는 공간입니다.',
      url: BASE_URL,
      siteName: '품앗이',
      images: [
        {
          url: '/opengraph-image.png',
          width: 800,
          height: 418,
          alt: '품앗이 대표 이미지',
        },
      ],
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: '품앗이',
        template: '품앗이 | %s',
      },
      description:
        '카카오테크 부트캠프 교육생들을 위한 트래픽 품앗이 플랫폼, 품앗이는 프로젝트 홍보를 통해 교육생들이 서로의 성공을 함께 만들어가는 공간입니다.',
      images: ['/opengraph-image.png'],
    },
  },
  ROOT: {
    title: '프로젝트 공유 플랫폼',
    description:
      '품앗이 상위 프로젝트와 최신 프로젝트를 확인하고, 출석체크를 통해 오늘의 개발자 운세를 받아보세요. 품앗이에서 다양한 프로젝트를 탐색하고 공유하세요.',
  },
  PROJECTS: {
    title: '프로젝트 목록',
    description:
      '프로젝트 목록 페이지입니다. 품앗이에서 카테부 교육생들의 프로젝트를 확인할 수 있습니다.',
  },
  LOGIN: {
    title: '로그인',
    description:
      '품앗이 로그인 페이지입니다. 품앗이에 로그인하고 프로젝트를 공유하세요.',
  },
  SIGNUP: {
    title: '회원가입',
    description:
      '품앗이 회원가입 페이지입니다. 품앗이에 회원가입하고 프로젝트를 공유하세요.',
  },
});

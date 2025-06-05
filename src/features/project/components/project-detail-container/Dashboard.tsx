import { ProjectDashboard } from '../../schemas';

type DashboardProps = ProjectDashboard;

export function Dashboard({
  givedPumatiCount,
  receivedPumatiCount,
  teamRank,
}: DashboardProps) {
  const dashboardData = [
    {
      title: '받은 품앗이',
      value: receivedPumatiCount,
      unit: '번',
    },
    {
      title: '준 품앗이',
      value: givedPumatiCount,
      unit: '번',
    },
    {
      title: '품앗이 등수',
      value: teamRank,
      unit: '등',
    },
  ];
  return (
    <section className="flex flex-col gap-3 p-4 pb-6 bg-soft-blue rounded-lg max-w-[25rem] mx-auto">
      <h2 className="text-lg font-semibold">대시보드</h2>
      <ul className="flex w-full bg-white rounded-lg">
        {dashboardData.map((data) => (
          <li
            key={data.title}
            className="flex flex-col items-center my-3 px-3 w-1/3 border-r border-light-grey last:border-r-0"
          >
            <p className="text-sm text-grey font-medium">{data.title}</p>
            <p className="font-bold text-blue">
              {data.value}
              <span className="text-xs">{data.unit}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

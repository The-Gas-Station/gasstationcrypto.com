export const Stats = ({
  stat0,
  stat1,
  stat2,
  stat3,
  stat4,
  statTitle0,
  statTitle1,
  statTitle2,
  statTitle3,
  statTitle4,
}: any) => {
  return (
    <>
      <div className="NFPStatsBlock">
        <span>{statTitle0}</span>
        <p>{stat0}</p>
        <span>{statTitle1}</span>
        <p>{stat1}</p>
        <span>{statTitle2}</span>
        <p>{stat2}</p>
        <span>{statTitle3}</span>
        <p>{stat3}</p>
        <span>{statTitle4}</span>
        <p>{stat4}</p>
      </div>
    </>
  );
};
export default Stats;

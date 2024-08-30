import ContributionsChart from "./Goals/ContributionsChart";
import GoalsStatisticsComponent from "./Goals/GoalsStatisticsComponent";

function Home() {
  return (
    <>
      <h1>Goal Statistics</h1>
      <ContributionsChart/>
      <GoalsStatisticsComponent /> {/* Display the statistics at the top */}
    </>
  );
}

export default Home;

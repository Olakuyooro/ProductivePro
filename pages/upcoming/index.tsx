import UpcomingTasks from "@/src/client/components/Upcoming/components/upcomingTasks";
import withAuth from "@/src/client/shared/withAuth";
import type { NextPage } from "next";

const UpComingPage: NextPage = (props) => <UpcomingTasks />;

export default withAuth(UpComingPage);

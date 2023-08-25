import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditFloatingActionButtons from "@/components/fab/Edit";
import { useRouter } from "next/router";
import AddFloatingActionButtons from "@/components/fab/Add";
import moment from "moment";
import InfoAlert from "@/components/alerts/Info";
import { useEffect, useState } from "react";
import LoadingAlert from "@/components/alerts/Loading";
import { SmnkErrorBoundary } from "@/pages/_app";
import { ExperienceDetailsCard } from "@/components/tabs/UserDetailsTab";

export default function ExperienceComponent() {
  const { experience } = useSelector(
    (state: RootState) => state.swExtra.swExtra
  );
  const [exp, setExp] = useState<any[] | null>(null);
  useEffect(() => {
    setExp(experience);
  }, [experience]);
  const router = useRouter();
  if (!exp) return <LoadingAlert />;
  if (exp.length === 0)
    return (
      <InfoAlert message="You don't have any experience added. Please add one to boost your chances in getting jobs" />
    );
  return (
    <SmnkErrorBoundary>
      <Box minWidth={"100%"} mt={5} p={1}>
        <Typography variant="h6">Experiences:</Typography>
        {exp.map((exp, i) => (
          <Card key={exp._id}>
            <ExperienceDetailsCard exp={exp} />
            <EditFloatingActionButtons
              handleClick={() => {
                router.push(
                  `/sw-dashboard/experience/${experience.findIndex(
                    (e) => e.startDate === exp.startDate
                  )}`
                );
              }}
            />
          </Card>
        ))}{" "}
        <CardActions>
          <AddFloatingActionButtons
            handleClick={() => {
              router.push("/sw-dashboard/experience/add-experience");
            }}
          />
        </CardActions>
      </Box>
    </SmnkErrorBoundary>
  );
}

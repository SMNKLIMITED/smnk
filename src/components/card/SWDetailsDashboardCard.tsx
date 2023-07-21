import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { fetchProfessionalsDetails } from "@/lib/search";
import { getJobsDoneByUser, getUserProfile } from "@/lib/utils/user";
import { Box } from "@mui/material";
import UserDetailsBottomNavigation from "../bottomNavigation/UserDetailsBottomNavigation";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppBadIcon from "@mui/icons-material/GppBad";
import InfoAlert from "../alerts/Info";
import Comments from "../job/Comments";
import moment from "moment";
import CatalogDisplayStepper from "../stepper/CatalogDisplayStepper";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SWDetailsDashboardCard({ userId }: { userId: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<any | null>(null);
  const [userProfile, setUserProfile] = React.useState<any | null>(null);
  const [jobsDone, setJobsDone] = React.useState<number>(0);
  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    (async () => {
      const data = await fetchProfessionalsDetails(userId);
      //data comes with {swExtras,user,userExtra}
      setUserDetails(data);
      const profile = await getUserProfile(userId);
      setUserProfile(profile.data);
      const doneJobs = await getJobsDoneByUser(userId);
      setJobsDone(doneJobs.data && doneJobs.data.length);
    })();
  }, [userId]);

  //check for data before using them
  const dp =
    userDetails && userDetails.user && userDetails.user.dpFileName
      ? userDetails.user.dpFileName
      : "";
  const fullName = () => {
    if (userProfile) {
      if (userProfile.name) return userProfile.name;
      return userProfile.firstName + " " + userProfile.lastName;
    }
    return "";
  };
  const verified =
    userDetails &&
    userDetails.user &&
    userDetails.user.verification &&
    userDetails.user.verification.kycVeried;

  const serviceTitle = () => {
    if (
      userDetails &&
      userDetails.swExtras &&
      userDetails.swExtras.services &&
      userDetails.swExtras.services[0]
    ) {
      if (userDetails.swExtras.services[1]) {
        return (
          userDetails.swExtras.services[0].title +
          "," +
          userDetails.swExtras.services[1].title
        );
      } else {
        return userDetails.swExtras.services[0].title;
      }
    }
    return "";
  };
  const services =
    userDetails && userDetails.swExtras && userDetails.swExtras.services
      ? userDetails.swExtras.services
      : [];
  const skills = () => {
    const skillsArray: string[] = [];
    if (services.length > 0) {
      services.map((service: any) => {
        service.skills.map((skill: string) => {
          skillsArray.push(skill);
        });
      });
    }
    return skillsArray;
  };
  const experiences: any[] =
    userDetails && userDetails.swExtras && userDetails.swExtras.experience
      ? userDetails.swExtras.experience
      : [];
  return (
    <Card
      sx={{
        mt: 1,
        minWidth: "100%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 70, height: 70 }}
            aria-label="recipe"
            src={`/api/multer/profile-pic/${dp}`}
          ></Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Typography textTransform={"capitalize"}>{fullName()}</Typography>
              {fullName() && (
                <>
                  {verified ? (
                    <VerifiedIcon
                      color="success"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: 15,
                      }}
                    />
                  ) : (
                    <GppBadIcon
                      color="error"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: 15,
                      }}
                    />
                  )}
                </>
              )}
            </Box>
          </>
        }
        subheader={
          <SubHeader userProfile={userProfile} serviceTitle={serviceTitle()} />
        }
      />
      <CardContent>
        <UserDetailsBottomNavigation
          rating={
            userDetails && userDetails.userExtra && userDetails.userExtra.rating
              ? userDetails.userExtra.rating
              : 0
          }
          jobsDone={jobsDone}
          level={
            userDetails && userDetails.swExtras && userDetails.swExtras.level
          }
        />
        <Typography color="primary" fontWeight={"bold"} mt={5}>
          Bio:
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={5}>
          {userProfile && userProfile.description}
        </Typography>
        <Typography color="primary" fontWeight={"bold"} mt={5}>
          Services:
        </Typography>
        <ul>
          {services.length > 0 &&
            services.map((service: any) => (
              <li key={service.title}>
                <Typography textTransform={"capitalize"}>
                  {service.category}
                </Typography>
              </li>
            ))}
        </ul>
        <Typography color="primary" fontWeight={"bold"} mt={5}>
          Skills:
        </Typography>
        <ul>
          {skills().map((skill: any) => (
            <li key={skill}>
              <Typography textTransform={"capitalize"}>{skill}</Typography>
            </li>
          ))}
        </ul>
        <Typography color="primary" fontWeight={"bold"} mt={5}>
          Experiences:
        </Typography>
        <ul>
          {experiences.map((exp: any) => (
            <li key={exp._id}>
              {exp.onRole ? (
                <OnRoleExperience exp={exp} />
              ) : (
                <Experience exp={exp} />
              )}
            </li>
          ))}
        </ul>
        {userDetails &&
          userDetails.swExtras &&
          userDetails.swExtras.catalog.length > 0 && (
            <Box p={2} bgcolor={"white"} maxWidth={{ xs: "100%", md: 600 }}>
              <Typography variant="subtitle2">Catalog:</Typography>
              <CatalogDisplayStepper catalog={userDetails.swExtras.catalog} />
            </Box>
          )}
        <Typography fontWeight={"bold"} mt={2}>
          Comments
        </Typography>
        <Comments />
      </CardContent>
    </Card>
  );
}

function Experience({ exp }: { exp: any }) {
  if (!exp) return <p></p>;
  return (
    <Box mb={2}>
      <Typography maxWidth={300}>
        {`I worked as a ${exp.title} for ${exp.company}, ${exp.address}, ${
          exp.lga
        }, ${exp.state} from ${moment(exp.startDate).format(
          "DD-MM-YY"
        )} to ${moment(exp.endDate).format("DD-MM-YY")}.`}
      </Typography>
      <Typography>{exp.description}</Typography>
    </Box>
  );
}
function OnRoleExperience({ exp }: { exp: any }) {
  if (!exp) return <p></p>;
  return (
    <Box mb={2}>
      <Typography maxWidth={300} mb={1}>
        {`I am currently working as a ${exp.title} for ${exp.company}, ${exp.address}, ${exp.lga}, ${exp.state}.`}
      </Typography>
      <Typography>{exp.description}</Typography>
    </Box>
  );
}
function SubHeader({
  userProfile,
  serviceTitle,
}: {
  userProfile: any;
  serviceTitle: string;
}) {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      flexDirection={"column"}
    >
      <Typography variant="caption" textTransform={"capitalize"}>
        {serviceTitle}
      </Typography>
      <Typography variant="caption">
        {userProfile && userProfile.lga + "," + userProfile.state}
      </Typography>
    </Box>
  );
}

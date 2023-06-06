import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import useSWR from "swr";
import { getAllAds } from "@/lib/admin";
import { useRouter } from "next/router";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function AdsStepper() {
  const { data } = useSWR("getAds", getAllAds());
  const router = useRouter();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const maxSteps = data && data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
if(!data  || data.length < 1) return <p></p>
  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }} position={'relative'} m={'1rem'}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography fontWeight={"bold"} textTransform={"capitalize"}>
          {data && data[activeStep].title}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={10000}
      >
        {data &&
          data.map((ad: any, index: number) => (
            <div key={ad.title}>
 <Box
        position={"absolute"}
        top={0}
        sx={{ opacity: "0.1",overflow:'hidden'}}
        bgcolor={"black"} color={'white'} fontWeight={'bold'}
        p='.1rem 1rem'
        height={250}
        minWidth={'100%'}
        maxHeight={250}
        onClick={() => {
          if(ad.landingPage){
            window.location.href = ad.landingPage
          }
        }}
      >
        <Typography variant="body2">
          {data && data[activeStep].description}
        </Typography>
      </Box>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 250,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={`/api/multer/ads/${ad.imgName}`}
                  alt={ad.title}
                  />
                  ) : null}
            </div>
          ))}
      </AutoPlaySwipeableViews>
     
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default AdsStepper;
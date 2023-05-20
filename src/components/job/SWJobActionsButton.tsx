import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { JobStatus } from "./AdminJobStatus";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { confirmSWPaid } from "@/lib/payment";
import { cancelJob } from "@/lib/job";

function SWJobActionsButton({
  jobId,
  jobStatus,
}: {
  jobStatus: JobStatus;
  jobId: string;
}) {
  const router = useRouter();
  const { _id } = useSelector((state: RootState) => state.users.user);
  return (
    <>
      {jobStatus.swPaid && (
        <h4 style={{ color: "green" }}>Payment Confirmed. Well Done!!!!</h4>
      )}
      {!jobStatus.isProposalAccepted &&
        !jobStatus.hasThisUserApplied && (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform:'capitalize'}}
            onClick={() => {
              router.push(`/sw-dashboard/job/${jobId}`);
            }}
          >
            Apply
          </Button>
        )}
        {jobStatus.isProposalAccepted && !jobStatus.isJobPaidFor &&
        jobStatus.hasThisUserApplied && (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform:'capitalize'}}
            onClick={async() => {
              const result  = await cancelJob(jobId)
              if(result){
                alert('Job cancelled')
                router.push(`/dashboard/job/recommended-jobs`);
              }else{
                alert('An error occurred,try again')
              }
            }}
          >
            Cancel
          </Button>
        )}
     
      {jobStatus.isJobApproved && !jobStatus.swPaid && (
        <>
          <Button
            variant="contained"
            size="small"  sx={{textTransform:'capitalize'}}
            onClick={async () => {
              const confirmed = await confirmSWPaid(jobId);
              if (confirmed) {
                alert("Payment confirmed");
                router.push("/dashboard/job/done");
              }
            }}
          >
            Confirm Payment
          </Button>
          <Button
            variant="contained"
            size="small" sx={{textTransform:'capitalize'}}
            onClick={() => {
              router.push(`/report/${jobId}`);
            }}
          >
            Message Admin
          </Button>
        </>
      )}
    
    </>
  );
}

export default SWJobActionsButton;

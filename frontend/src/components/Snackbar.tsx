import { useDispatch, useSelector } from "react-redux";
import { withSnackbar } from "notistack";

import { clearSnackbar } from "../modules/snackbar";

const SuccessSnackbar = (props: any) => {
  const dispatch = useDispatch();
  const { open, message, variant } = useSelector((state: any) => state.snackbar);

  if (open) {
    props.enqueueSnackbar(message, { variant });
    dispatch(clearSnackbar());
  }

  return <></>;
};

export default withSnackbar(SuccessSnackbar);

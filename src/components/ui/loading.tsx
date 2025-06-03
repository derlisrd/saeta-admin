import { Backdrop, CircularProgress } from "@mui/material";

function LoadingScreen() {
    return <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
        onClick={() => { }}
    >
        <CircularProgress />
    </Backdrop>
}

export default LoadingScreen;
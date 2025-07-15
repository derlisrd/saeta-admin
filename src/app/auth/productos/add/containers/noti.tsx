import { Alert, Snackbar } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";


function Notificacion() {
    const { noti, setNoti } = useAddProducto()

    if (noti === null) return <></>
    return <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)} anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message={noti.message}
    >
        <Alert
            onClose={() => setNoti(null)}
            severity="info"
            sx={{ width: '100%' }}
            icon={false}
        >
            {noti.message}
        </Alert>
    </Snackbar>
}

export default Notificacion;
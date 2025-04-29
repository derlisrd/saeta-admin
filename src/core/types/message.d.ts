export default interface MessageType {
    name: string;
    descripcion: string;
    code?: number;
    severity?: "success" | "error" | "warning" | "info";
}
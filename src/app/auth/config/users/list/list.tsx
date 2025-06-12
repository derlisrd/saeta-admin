import GenericTable from "@/components/table/GenericTable";
import { Box, Button, Container, InputAdornment, LinearProgress, Slide, Stack, TextField } from "@mui/material";
import ColumnsUsers from "./_components/ColumnsUsers";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { UserListResults } from "@/services/dto/users/user";
import { useNavigate } from "react-router-dom";
import { useUserProvider } from "./provider";

function UsersList() {
    const { users, isLoading, handleModals, setSelectedUser } = useUserProvider();

    const [search, setSearch] = useState("");
    const nav = useNavigate();

    const listado = users ? users.filter((item: UserListResults) => item.name.toLowerCase().includes(search.toLowerCase()) || item.username.includes(search)) : [];

    return (
        <Container>
            <Stack spacing={2} my={2} direction="row" alignItems="center">
                <TextField
                    label="Buscar"
                    placeholder="Nombre o documento"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon name='search' />
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={({ target }) => setSearch(target.value)}
                />
                <Button startIcon={<Icon name="user-plus" />} onClick={() => nav("/config/users/add")}>
                    Registrar
                </Button>
            </Stack>
            {isLoading ? (
                <LinearProgress />
            ) : (
                <Slide direction="down" in mountOnEnter unmountOnExit>
                    <Box>
                        <GenericTable data={listado} columns={ColumnsUsers(setSelectedUser, handleModals)} rowHeight={40} headerHeight={36} />
                    </Box>
                </Slide>
            )}
        </Container>
    );
}

export default UsersList;

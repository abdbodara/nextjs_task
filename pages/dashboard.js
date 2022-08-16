
import { Backdrop, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useGetUsersQuery } from '../stores/services/userApiSlice'
import styles from '../styles/Dashboard.module.css'
const Dashboard = (props) => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    
    return (
        !isLoading && data ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Company Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.company.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export function getServerSideProps({ req, res }) {
    let response = { props: {} }

    if (!req.cookies.name && !req.cookies.password && !req.cookies.id && !req.cookies.email) {
        response.redirect = {
            permanent: false,
            destination: "/register",
        }
        return response;
    }

    if (req.cookies.id) {
        response.props.id = req.cookies.id
    }
    if (req.cookies.email) {
        response.props.email = req.cookies.email
    }
    if (req.cookies.name) {
        response.props.name = req.cookies.name
    }

    return response
}
export default Dashboard
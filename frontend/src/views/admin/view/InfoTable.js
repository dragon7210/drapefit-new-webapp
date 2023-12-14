import {
  Box,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
  styled
} from '@mui/material';
import { getProfile } from 'actions/common/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Gender } from 'constant/function';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '6px'
  }
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const InfoTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile({ id }));
  }, [dispatch]);

  const { profile } = useSelector((state) => state.auth);

  return (
    <>
      <Box className="fx-lg-padding">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">Gender:</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">
                    {profile?.kids_detail
                      ? profile?.kids_detail?.kids_clothing_gender === 'boys'
                        ? 'Boy'
                        : 'Girl'
                      : Gender(Number(profile?.user_detail?.gender))}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">Email:</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">{profile?.email}</Typography>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">Full Name:</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">
                    {profile?.kids_detail
                      ? profile?.kids_detail?.kids_first_name
                      : profile?.user_detail?.first_name + ' ' + profile?.user_detail?.last_name}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">Address:</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">{profile?.user_detail?.address}</Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default InfoTable;

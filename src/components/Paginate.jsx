import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { setCurrentPage } from "store/slice/postsSlice";
import { useDispatch } from "react-redux";

export default function Paginate({ currentPage }) {
  const dispatch = useDispatch();

  const handlePageChange = (event, page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Stack spacing={2} direction='row' justifyContent='center'>
      <Pagination
        count={5}
        page={currentPage}
        onChange={handlePageChange}
        variant='outlined'
        shape='rounded'
        showFirstButton
        showLastButton
        color='primary'
      />
    </Stack>
  );
}

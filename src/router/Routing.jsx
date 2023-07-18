import PostItem from "components/PostItem";
import PostsList from "components/PostsList";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<PostsList />} />
          <Route path=':id' element={<PostItem />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;

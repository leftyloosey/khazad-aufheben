import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
const Paginate = ({ pages, page, isAdmin}) => {
    console.log(page)
    console.log(pages)
    return (
    pages > 1 && (
        <Pagination>
        {[...Array(pages).keys()].map((x) => (
            <LinkContainer
                key={x + 1}
                to={
                !isAdmin
                ? `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>jygi{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetProductsQuery, useCreateProductMutation } from '../../slices/productsApiSlice'

const ProductListScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery()

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation

    const deleteHandler = (id) => {
        console.log('delete', id)
    }    
    const createProductHandler = async () => {
        if (window.confirm('Are you sure?')) {
            try {
                await createProduct()
            } catch (err) {
                toast.error(err?.data?.emssage || err.error)
            }
        }
    }    
  return <>
    <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            <Button className='btn-sm m-3' onClick={createProductHandler}>
                <FaEdit /> Create Product
            </Button>
        </Col>
    </Row>
    {}
    {isLoading ? <Loader /> : error ? <Message variant='danger'>
        {error}</Message> : (
            <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {products.map((product => (
                            <tr key={product._id}>
                               <td>{product._id}</td> 
                               <td>{product.name}</td> 
                               <td>{product.price}</td> 
                               <td>{product.category}</td> 
                               <td>{product.brand}</td> 
                               <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{ color: 'white' }}/>
                                    </Button>
                                </td> 
                            </tr>
                        )))}
                    </tbody>
                </Table>
            </>
        )

    } </>
}

export default ProductListScreen

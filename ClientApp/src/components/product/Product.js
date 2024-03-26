import React, {Component} from "react";

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.state = {products: [], loading: true};
    }

    componentDidMount() {
        this.populateProductData();
    }

    handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus entitas ini?")) {
            this.setState({ loading: true });
            try {
                const response = await fetch(`product/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    this.setState({ loading: false });
                    this.populateProductData(); // Mengambil data produk lagi setelah penghapusan berhasil
                }
            } catch (error) {
                this.setState({ loading: false, error: error.message });
            }
        }
    }

    static renderProductsTable(products, handleDelete) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product =>
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                            <a href={`/edit-product/${product.id}`}>Edit</a> |
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        const { products, loading } = this.state;

        let contents = loading
            ? <p><em>Loading...</em></p>
            : Product.renderProductsTable(products, this.handleDelete);

        return (
            <div>
                <h1 id="tableLabel">Products</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <a href="/add-product">Tambahkan</a>
                {contents}
            </div>
        );
    }

    async populateProductData() {
        try {
            const response = await fetch('product');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            this.setState({ products: data.data, loading: false });
        } catch (error) {
            console.error('Error fetching product data:', error);
            this.setState({ loading: false });
        }
    }
}


import React, { Component } from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", price: 0, description: "", loading: false, error: null };
    }

    componentDidMount() {
        this.fetchProductDetails();
    }

    fetchProductDetails = async () => {
       const {id } = this.props.params;
        console.log(id);
        try {
            const response = await fetch(`product/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            const product = await response.json();
            this.setState({
                name: product.data.name || "",
                price: product.data.price || 0,
                description: product.data.description || ""
            });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const { id } = this.props.params;

        const { name, price, description } = this.state;

        const response = await fetch(`product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: price,
                description: description
            })
        });

        if (response.ok) {
            this.setState({ loading: false });
            window.location.href = "/fetch-products";
        }
    }

    render() {
        const { name, price, description, loading, error } = this.state;

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <div>
                <h1>Edit Product</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" value={price} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" value={description} onChange={this.handleChange}></textarea>
                    </div>
                    <button type="submit" disabled={loading}>Save</button>
                </form>
            </div>
        );
    }
}

export default withParams(EditProduct);

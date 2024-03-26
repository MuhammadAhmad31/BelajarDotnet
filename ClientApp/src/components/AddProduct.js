import { Component } from "react";

export class AddProduct extends Component {
    static displayName = "Add Product";

    constructor(props) {
        super(props);
        this.state = { name: "", price: 0, description: "", loading: false };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
    
        const { name, price, description } = this.state;
    
        const response = await fetch('product', {
            method: 'POST',
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
            this.props.history.push('/fetch-products');
        }
    }
    

    render() {
        return (
            <div>
                <h1>Add Product</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" id="name" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" onChange={this.handleChange}></textarea>
                    </div>
                    <button type="submit" disabled={this.state.loading}>Save</button>
                </form>
            </div>
        );
    }


}
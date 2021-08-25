import React from "react";
import { withRouter } from "react-router-dom";
import { storage } from "./../../../src/firebase";
import ImageGalleryView from "./../image_gallery_view/image_gallery_view";
import ImageSlider from "./../image_slider/image_slider";
import SuccessModalContainer from "./../success_modal/success_modal_container";
import "./styles.scss";
import { adminEmails } from "../../util/adminAccount"

class ItemFormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      price: "",
      isLoading: null,
      subtitle: "",
      name: "",
      condition: "",
      item_id: "",
      categories: ["Electronics", "Textbooks", "Apparel", "Tickets", "Sports & Outdoor", "Furniture", "Beauty & Health", "Other"],
      category: "",
      conditions: ["New", "Mint", "Excellent", "Good", "Fair", "Salvage"],
      image: null,
      url: "",
      images: [],
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }


  componentDidMount(){
     this.fetchCurrentItem(this.props.itemId)
  }


  componentWillMount(){
      if(!adminEmails.includes(this.props.currentUser.email_address)){
          this.props.history.push("/home")
      }
  }


  fetchCurrentItem(itemId){
    this.setState({ isLoading: true })
    this.props.fetchCurrentItem(itemId).then((res) => {
        const item = res.item;
        this.setState({description: item.description, name: item.name, 
            subtitle: item.subtitle, condition: item.condition_name, category: item.category_name,
        images: item.image_urls, price: item.price, item_id: item.id, isLoading: false  })
       
    });
  }
  
  handleChange = e => {
    if(e.target.files[0]) {
      const image = e.target.files[0]
      this.setState(() => ({image}), () => {
        this.handleUpload();
      });
    }
  };

  onFocus = (id) => {
    this.setState({ [id]: "" });
    document.getElementById(id).value = '';
    document.getElementById(id).trigger(jQuery.Event('keyup', { keycode: 40 }))

  }


  handleUpload = () => {
    const { image } = this.state;
    const imageName = require("uuid").v4() + ".jpg";
    const uploadTask = storage.ref(`images/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            let images = this.state.images;
            images.push(url);

            this.setState({
              images: images,
            });

          });
      }
    );
  };

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.currentTarget.id !== "item-form-submit") {
      return;
    }

    const itemObject = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      description: this.state.description,
      condition: this.state.condition,
      category: this.state.category,
      price: this.state.price,
      images: this.state.images,
      item_id: this.state.item_id
    };
    const item = Object.assign(
      { user_id: this.props.currentUser.id },
      itemObject
    );
    this.props.editItem(item);
  }

  renderErrors() {
    return (
      <ul className="error-section">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {

    const { description, price, isLoading, subtitle, name,
       condition, categories, category, images, item_id, conditions } = this.state;
    const emptyImageSection = () => (
      <div className="empty-images-section">
        <img
          className="empty-images-icon"
          src="https://icon-library.net/images/image-icon/image-icon-1.jpg"
        ></img>
        <p>Images will appear here once you start adding them.</p>
      </div>
    );


    const imageGallerySection = () => (
      <div className="image-gallery-section">
        <ImageSlider images={images} />
        <ImageGalleryView imageUrls={images} />
      </div>
    );

    const imageUploadSection = () => (
      <div className="image-upload-container">
      <input className="image-upload-input" type="file" id="file" onChange={this.handleChange} />
      <label htmlFor="file" className="image-upload-label">
        <img className="upload-image-icon" src="https://www.freeiconspng.com/uploads/upload-icon-3.png"/>
      </label>
      <h3 className="num-img-uploaded-text">{images.length} image(s) uploaded</h3>
      {this.state.images.length > 0 ? imageGallerySection() : emptyImageSection()}
    </div>
    )

    const loader = () => (
      <span className="cssload-loader">
        <span className="cssload-loader-inner" />
      </span>
    );

    
    return (
      <div className="item-form-container">
        { isLoading ? loader() : null }
        {!isLoading && 
        <form onSubmit={this.handleSubmit} className="item-form-box">
          <label className="item-form-header">List an item on Unify.</label>
          <br />
          <div className="item-form">
            <div className="image-input-section">{imageUploadSection()}</div>
            <div className="text-input-section">
              <div className="header-info-text-section">
                <p className="header-info-text">
                  By posting, you confirm that this listing complies with
                  Unify's Commerce Policies and all applicable laws.
                </p>
              </div>
              <input
                id="category"
                list="categories"
                onFocus={() => this.onFocus("category")}
                value={category}
                onChange={this.update("category")}
                className="item-form-input"
                placeholder="Category"
              />
              <datalist id="categories">
                {categories.map((category, i) => (
                    <option value={category} key={i}/>
                ))}
              </datalist>

              <br className="category-text-break-line" />
              <input
                type="text"
                value={name}
                onChange={this.update("name")}
                className="item-form-input"
                placeholder="Item name"
              />
              <br />
              <input
                type="text"
                value={subtitle}
                onChange={this.update("subtitle")}
                className="item-form-input"
                placeholder="Subtitle (put something to catch people's attention here)"
              />
              <br />
              <input
                type="text"
                value={description}
                onChange={this.update("description")}
                className="item-form-input"
                placeholder="Description"
              />
              <br />
              <input
                id="condition"
                list="conditions"
                onFocus={() => this.onFocus("condition")}
                value={condition}
                onChange={this.update("condition")}
                className="item-form-input"
                placeholder="Condition"
              />
              <datalist id="conditions">
              {conditions.map((condition, i) => (
                    <option value={condition} key={i}/>
                ))}
              </datalist>
              <br />

              <input
                type="number"
                value={price}
                onChange={this.update("price")}
                className="item-form-input price-input"
                placeholder="$0.00"
                min="0.00"
                max="10000.00"
                step="0.01"
              />
              <br />
              {this.props.showSuccessModal === true ? (
                <SuccessModalContainer
                  btnTitle="Start Exploring!"
                  message="Item was successfully editted"
                  navigate={"/"}
                />
              ) : null}
              {this.renderErrors()}
              <br />
              <button
                id="item-form-submit"
                className="item-form-submit"
                onClick={this.handleSubmit}
              >
                Upload item
              </button>
            </div>
          </div>
        </form>
        }
      </div>
    );
  }
}

export default withRouter(ItemFormEdit);

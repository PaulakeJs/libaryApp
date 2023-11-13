import { useState } from "react";
import NoImageSelected from "../../assets/no_image.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState(NoImageSelected)

  const createBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });

      // const response = await fetch("http://localhost:8000/api/books", {
      //   method: "POST",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify({
      //     title,
      //     slug,
      //     stars,
      //     description,
      //     category:categories
      //   }),
      // });
      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
      } else {
        console.log("failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };



  const onImageChange = (e) =>{
    if(e.target.files && e.target.files[0]){
      setImage(URL.createObjectURL (e.target.files[0]))
      setThumbnail(e.target.files[0])
    }
  }
















  return (
    <div>
      <h1>Create Book</h1>
      {submitted ? (
        <p>Form Submitted Successfully </p>
      ) : (
        <form
          className="
    bookdetails"
          onSubmit={createBook}
        >
          <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={image} alt="img preview" />

            <input type="file"
            onChange={onImageChange}
            accept="image/gif, image/jpeg, image/png" />
          </div>

          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div>
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                rowws="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label>Categories (comms-seprated) </label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
              />
            </div>

            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateBook;

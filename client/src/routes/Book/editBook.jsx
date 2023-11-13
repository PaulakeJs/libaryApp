import { useState, useEffect } from "react";
import NoImageSelected from "../../assets/no_image.jpg";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/api/books/${urlSlug.slug}`;
  const navigate  = useNavigate()
  
  const [title, setTitle] = useState("");
  const [bookId, setBookId] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("failed to fetch Data");
      }
      const data = await response.json();


      setBookId(data._id)
      setTitle(data.title);
      setSlug(data.slug);
      setStars(data.stars);
      setDescription(data.description);
      setCategories(data.category);
      setThumbnail(data.thumbnail);








    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBook = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
  
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/books', {
        method: "PUT",
        body: formData,
      });
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

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const removeBook = async(e)=>{
            try{
                const response = await fetch(
                    "http://localhost:8000/api/books/" + bookId,{
                        method: "DELETE"
                    }
                )
                if(response.ok){
                    navigate("/books")
                    console.log("removed")
                }

            }   catch(error){
                console.error(error)
            } 


}
  return (
    <div>
      <h1>Edit Your Book</h1>

        <button onClick={removeBook} className="delete">
            Delete Book
        </button>


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







            {image?(

            <img src={`$image}`} alt="img preview" />
            ):(

            <img src={`http://localhost:8000/uploads/${thumbnail}`} alt="img preview" />
            )}

            <input
              type="file"
              onChange={onImageChange}
              accept="image/gif, image/jpeg, image/png"
            />
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

export default EditBook;

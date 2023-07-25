import React, { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import fileService from '../services/file.service';
import authService from '../services/auth.service';



function Home() {
    const [files, setFiles] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();


    const getAllFilesInformations = async () => {
      fileService.getAllFilesInformations().then(
        (response) => {
          console.log(response);
          setFiles(response.data);
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    }


    useEffect(() => {
        const user = authService.getCurrentUser();
        if(user){
          setFirstName(user.firstName);
          setLastName(user.lastName);
          getAllFilesInformations();
        }
        else{
            navigate("/login");
        }
        
    }, []);

    const handleLogout = async () => {
      try {
        await authService.logout();
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    };

    const uploadFile = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      try {
        await fileService.uploadFile(formData).then(
          (response) => {
            if(response.status == 200){
              setFile(null);
              getAllFilesInformations();
            }
            else if(response.status == 401){
                authService.logout();
                navigate("/login");
            }
            else if(response.status == 400){
              console.log(response.data.message);
              alert(response.data.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    const handleGetFile = async (fileInformationId) => {
      try {
        await fileService.getFile(fileInformationId).then(
          (response) => {
            if(response.status == 200){
              const fileURL = URL.createObjectURL(response);
              window.open(fileURL);
            }
            else if(response.status == 401){
                authService.logout();
                navigate("/login");
            }
            else if(response.status == 400){
              console.log(response.data.message);
              alert(response.data.message);
              getAllFilesInformations();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    const handleDeleteFile = async (fileInformationId) => {
      try {
        await fileService.deleteFile(fileInformationId).then(
          (response) => {
            if(response.status == 200){
              getAllFilesInformations();
            }
            else if(response.status == 401){
                authService.logout();
                navigate("/login");
            }
            else if(response.status == 400){
              console.log(response.data.message);
              alert(response.data.message);
              getAllFilesInformations();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };


  const renderFiles = () => {
    return files.map(({ fileInformationId, path, size, name, extension }) => {
      return <tr key={fileInformationId} >
      <td>{path}</td>
      <td>{size}</td>
      <td>{name}</td>
      <td>{extension}</td>
      <td>
        <button className="btn btn-danger" onClick={()=> {handleDeleteFile(fileInformationId)}}>Delete</button>&nbsp;
        <button className="btn btn-warning" onClick={()=> {handleGetFile(fileInformationId)}}>View</button>
      </td>
    </tr>
    })
  }
  
  return (
    <div>
      <div className="container mt-5">{firstName} {lastName}&nbsp;
      <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
      <div className="container mt-5">
        <form onSubmit={uploadFile}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
          { file &&
          <button type="submit" className="btn btn-secondary">Upload</button>
          }
        </form>
      </div>
      <div className="files-container">
      <table className="files-table">
        <thead>
          <tr>
            <th>Path</th>
            <th>Size</th>
            <th>Name</th>
            <th>Extension</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {renderFiles()}
        </tbody>
      </table>
    </div>
    </div>
    

      
  )
}

export default Home;   
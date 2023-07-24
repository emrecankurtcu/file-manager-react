import React, { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import fileService from '../services/file.service';
import authService from '../services/auth.service';



function Home() {
    const [files, setFiles] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [file, setFile] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const user = authService.getCurrentUser();
        if(user){
          setFirstName(user.firstName);
          setLastName(user.lastName);
          // fileService.getAllFilesInformations().then(
          //       (response) => {
          //         console.log(response);
          //         setFiles(response.data);
          //       },
          //       (error) => {
          //         console.log(error);
          //       }
          //     );
          setFiles([
            {
                "fileInformationId": 1,
                "path": "uploads\\files\\3yf761logrh736zdhvlaht0ydbnxk1j7nmkf06048cy40c5n3es5k2xy8dmd43xn\\TEST.pdf",
                "size": 28894,
                "name": "TEST.pdf",
                "extension": "pdf"
            },
            {
                "fileInformationId": 2,
                "path": "uploads\\files\\3yf761logrh736zdhvlaht0ydbnxk1j7nmkf06048cy40c5n3es5k2xy8dmd43xn\\TEST.pdf",
                "size": 28894,
                "name": "TEST.pdf",
                "extension": "pdf"
            },
            {
                "fileInformationId": 3,
                "path": "uploads\\files\\3yf761logrh736zdhvlaht0ydbnxk1j7nmkf06048cy40c5n3es5k2xy8dmd43xn\\TEST.pdf",
                "size": 28894,
                "name": "TEST.pdf",
                "extension": "pdf"
            },
            {
                "fileInformationId": 4,
                "path": "uploads\\files\\3yf761logrh736zdhvlaht0ydbnxk1j7nmkf06048cy40c5n3es5k2xy8dmd43xn\\TEST.pdf",
                "size": 28894,
                "name": "TEST.pdf",
                "extension": "pdf"
            },
            {
                "fileInformationId": 5,
                "path": "uploads\\files\\3yf761logrh736zdhvlaht0ydbnxk1j7nmkf06048cy40c5n3es5k2xy8dmd43xn\\TEST.pdf",
                "size": 28894,
                "name": "TEST.pdf",
                "extension": "pdf"
            }
        ]);
            
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
      try {
        await fileService.uploadFile(file).then(
          () => {
            navigate("/home");
          },
          (error) => {
            console.log(error.message)
            alert(error.message);
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
            console.log(response);
          },
          (error) => {
            console.log(error.message)
            alert(error.message);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    const handleDeleteFile = async (fileInformationId) => {
      try {
        await fileService.deleteFile(fileInformationId).then(
          () => {
            navigate("/home");
          },
          (error) => {
            console.log(error.message)
            alert(error.message);
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
          <input type="file" onChange={(e) => setFile(e.target.value)}/>
          { file.length > 0 &&
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
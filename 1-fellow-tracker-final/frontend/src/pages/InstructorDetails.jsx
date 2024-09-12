import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const InstructorDetails = () => {
  const [instructor, setInstructor] = useState({});
  const [newInstructorName, setNewInstructorName] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/instructors/${id}`)
        if (data) setInstructor(data);
      } catch (error) {
        console.log(error);
      }
    }
    doFetch();
  }, [id]);

  const deleteInstructor = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      const [data, error] = await fetchData(`/api/instructors/${id}`, options)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const changeInstructorName = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ instructorName: newInstructorName })
      }
      const [data, error] = await fetchData(`/api/instructors/${id}`, options)
      if (data) setInstructor(data)
    } catch (error) {
      console.log(error);
    }
    setNewInstructorName('');
  }

  return (
    <>
      <h1>Instructor Details</h1>
      <p>{instructor.name} - {instructor.id}</p>
      <button onClick={deleteInstructor}>Delete Instructor</button>
      <form onSubmit={changeInstructorName}>
        <label htmlFor="name">Update Instructor Name</label>
        <input type="text" name="name" id="name" value={newInstructorName} onChange={(e) => setNewInstructorName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
    </>
  )
}

export default InstructorDetails;

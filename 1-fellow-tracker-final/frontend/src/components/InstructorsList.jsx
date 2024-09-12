/* eslint-disable no-unused-vars */
import fetchData from "../utils/fetchData";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InstructorsList = () => {
  // Get all Instructor from the serverstate
  const [instructors, setInstructors] = useState([]);
  // form input state
  const [newInstructorName, setNewInstructorName] = useState('');
  // form submission response state
  const [newlyAddedInstructor, setNewlyAddedInstructor] = useState({})

  // Get me the most up to date full list of Instructor
  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData('/api/instructors/')
        if (data) setInstructors(data);
      } catch (error) {
        console.log(error);
      }
    }
    doFetch();
  }, [newlyAddedInstructor])

  // Use the form data to create a POST request to create a new instructor
  const createInstructor= async (e) => {
    e.preventDefault();
    try {
      const [data, error] = await fetchData(`/api/instructors/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ instructorName: newInstructorName })
      });

      if (data) setNewlyAddedInstructor(data);
    } catch (error) {
      console.log(error);
    }
    setNewInstructorName('')
  }
  return (
    <section>
      <form onSubmit={createInstructor}>
        <label htmlFor="name">Add A New instructor</label>
        <input type="text" name="name" id="name" value={newInstructorName} onChange={(e) => setNewInstructorName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {
          instructors.map((instructor) => {
            return <li key={instructor.id}>
              <Link to={`instructors/${instructor.id}`}>
                {instructor.name} - {instructor.id}
              </Link>
            </li>
          })
        }
      </ul >
    </section>
  )
}

export default InstructorsList;
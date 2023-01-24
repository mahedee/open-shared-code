// rafce short cut for functional component

import React, { useEffect, useState } from "react";
import { getAllIssues } from "../../services/IssueServices";
import { Link } from "react-router-dom";

function Issues() {
  // set states
  const [issueList, setIssueList] = useState({
    issues: [],
    loading: true,
    error: "",
  });

  //useEffect() is to be used for side-effects executed in the render cycle
  useEffect(() => {
    getAllIssues().then((response) => {
      console.log(response);
      setIssueList({ issues: response.data, loading: false, error: "" });
    });

    //console.log("All issues for use effect: ");
    //console.log(issueList);
    //setIssueList(allIssues);
  }, []);

  // function getAllIssues() {
  //   //const response = getData("api/Issues");
  //   //return response;

  //   try {
  //     const response = axios.get(BASE_URL + `api/Issues`);
  //     console.log("After axios");
  //     //console.log(response);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  function renderAllIssues() {
    //console.log("All issues");
    return (
      //    <button onClick={() => setNewMessage(new Date().toISOString())}>
      // </button>
      <div>
        <Link to="/createIssue" type="button">
          <button type="button" className="btn btn-info">
            Create Issue
          </button>
        </Link>
        <br></br>
        <br></br>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Issue Id</th>
              <th>Code</th>
              <th>Title</th>
              <th>Created by</th>
              <th>Assign to</th>
            </tr>
          </thead>
          <tbody>
            {issueList.issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.code}</td>
                <td>{issue.title}</td>
                <td>{issue.description}</td>
                <td>{issue.createdBy}</td>
                <td>{issue.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      Issues
      {renderAllIssues()}
    </div>
  );
}

export default Issues;

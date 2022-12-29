// rafce short cut for functional component

import React, { useEffect, useState } from "react";
import { getData } from "../../services/AccessAPI";

function Issues_Old() {
  // set states
  const [issueList, setIssueList] = useState({
    issues: [],
    loading: true,
    error: "",
  });

  //useEffect() is to be used for side-effects executed in the render cycle
  useEffect(() => {
    //Console.log("Issues: useEffect");
    console.log("Issues: useEffect");

    // set all issues
    //var allIssues = getAllIssues();

    getAllIssues().then((response) => {
      //console.log(response);
      setIssueList({ issues: response, loading: false, error: "" });
    });

    console.log("All issues for use effect: ");
    console.log(issueList);
    //setIssueList(allIssues);
  }, []);

  function getAllIssues() {
    const response = getData("api/Issues");
    return response;
    // getData("api/Issues").then((result) => {
    //   console.log(result);
    // });
    //var outputResult;
    //try {
    //var outputResult = await getData("api/Issues");
    // } catch (exp) {
    //   console.log(exp.message);
    // }
    // .then((result) => {
    //   //let responseJson = result;
    //   //outputResult = result;
    //   //console.log(result);
    //   //return result;
    //   // if (responseJson) {
    //   //   setIssueList({
    //   //     issues: responseJson,
    //   //     //loading: false,
    //   //   });
    //   // }
    // });
    //console.log(outputResult);
    //return outputResult;
  }

  function renderAllIssues() {
    //console.log("All issues");
    return (
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

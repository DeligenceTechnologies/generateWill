"use client";
// pages/index.js
import { useState } from "react";
import { Button, InputGroup, Form, Spinner, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [prompt, setPrompt] = useState(
    "generate the details of the person and its related information for person id 2"
  );
  const [reply, setReply] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchWill = async () => {
    setLoading(true);
    await fetch(`/api/generate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ input: prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReply(JSON.parse(data.response));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="pt-2">
        <InputGroup className="mb-3 p-4">
          <Form.Control
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter query to generate will"
          ></Form.Control>
          <Button onClick={handleFetchWill}>Generate Will</Button>
        </InputGroup>
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && reply.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact No.</th>
                <th>DOB</th>
                <th>Relationship</th>
                <th>Beneficiary</th>
                <th>Percentage</th>
                <th>Asset Description</th>
              </tr>
            </thead>
            {reply.map((profile, index) => (
              <tbody key={`qty-${index}`}>
                <tr>
                  <td>{index}</td>
                  <td>{profile.name}</td>
                  <td>{profile.address}</td>
                  <td>{profile.contact_number}</td>
                  <td>{profile.date_of_birth}</td>
                  <td>{profile.relationship}</td>
                  <td>{profile.beneficiary}</td>
                  <td>{profile.percentage}</td>
                  <td>{profile.asset_description}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </>
      ) : null}
    </>
  );
}

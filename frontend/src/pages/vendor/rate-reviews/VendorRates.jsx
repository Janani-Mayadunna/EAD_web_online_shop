import React, { useState, useEffect } from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";
import axios from "axios";
import UserProfileImg from "../../../images/user2.png";
import UserProfileImg2 from "../../../images/user1.png";

const VendorRates = () => {
  const [ratings, setRatings] = useState(null); // Vendor rating information
  const [groupedComments, setGroupedComments] = useState({}); // Grouped comments by product
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vendor comments and ratings
  useEffect(() => {
    const fetchVendorData = async () => {
      const vendorId = localStorage.getItem("vendor_id"); // Retrieve vendor_id from localStorage
      const token = localStorage.getItem("vendor_token"); // Retrieve token from localStorage

      try {
        const response = await axios.get(
          `https://localhost:7282/api/vendor/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const vendorData = response.data;
          console.log("Vendor data:", vendorData);
          setRatings(vendorData.ratings);

          // Grouping comments by product name
          const grouped = vendorData.comments.reduce((acc, comment) => {
            if (!acc["All Comments"]) {
              acc["All Comments"] = [];
            }
            acc["All Comments"].push(comment);
            return acc;
          }, {});

          setGroupedComments(grouped);
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch vendor data.");
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  // Function to render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi bi-star${i <= rating ? "-fill" : ""}`}
          style={{ color: "#FFD700", fontSize: "1.2rem", marginRight: "2px" }}
        ></i>
      );
    }
    return stars;
  };

  // DataTable columns definition
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1, // Display a sequential ID
      sortable: false,
      width: "80px",
    },
    {
      name: "Customer",
      cell: (row, index) => (
        <div className="d-flex align-items-center">
          <img
            src={index % 2 === 0 ? UserProfileImg : UserProfileImg2} // Alternate between the two images based on index
            alt="User"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <span>Customer</span>{" "}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      sortable: false,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-star-half"
      breadcrumb="Rates & Reviews"
    >
      <div
        className="col-md-12"
        style={{
          backgroundColor: "#f0f0f0",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {/* Display overall vendor rating */}
        <div className="mb-4 text-center">
          <br />
          <p style={{ fontWeight: "500", fontSize: "24px", color: "#333" }}>
            Overall Vendor Rating
          </p>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <div>{renderStars(ratings?.average)}</div>
            <span className="ms-2" style={{ fontSize: "18px", color: "#333" }}>
              {ratings?.average} / 5
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#777" }}>
            ({ratings?.totalReviews} Reviews)
          </p>
        </div>

        {/* Display comments */}
        <div key={"All Comments"} className="mb-4">
          <h5
            style={{ fontSize: "20px", fontWeight: "500", color: "#333" }}
            className="mb-3"
          >
            Comments by Customers
          </h5>
          {groupedComments["All Comments"]?.length > 0 ? (
            <DataTable
              columns={columns}
              data={groupedComments["All Comments"].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort by date (latest first)
              )}
              pagination={true}
              paginationPerPage={5}
              customStyles={{
                headCells: {
                  style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                  },
                },
                cells: {
                  style: {
                    fontSize: "15px",
                    color: "#555",
                  },
                },
              }}
              noDataComponent="No Reviews Available"
            />
          ) : (
            <p>No reviews available</p>
          )}
        </div>
        <br />
        <br />
      </div>
    </Layout>
  );
};

export default VendorRates;

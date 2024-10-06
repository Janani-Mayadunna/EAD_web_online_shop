import React from "react";
import Layout from "../layout";
import DataTable from "react-data-table-component";

// Sample data structure for vendor comments and ratings
const vendorData = {
  id: "66f99b15892861de49191009",
  name: "vendor",
  ratings: {
    average: 4.5,
    totalReviews: 2,
  },
  comments: [
    {
      customerId: "66f9982c453ac048b63062db",
      productId: "66fc631eb675929162618440",
      productName: "IPhone X",
      comment: "Goooood!",
      createdAt: "2024-10-05T11:30:08.011Z",
    },
    {
      customerId: "67012396a76881616c43acad",
      productId: "6700481bae07389cecbeca17",
      productName: "Laptop 1",
      comment: "Shape",
      createdAt: "2024-10-05T11:32:30.39Z",
    },
  ],
};

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

const VendorRates = () => {
  const { ratings, comments } = vendorData;

  // Grouping comments by product for better structuring
  const groupedComments = comments.reduce((acc, comment) => {
    if (!acc[comment.productName]) {
      acc[comment.productName] = [];
    }
    acc[comment.productName].push(comment);
    return acc;
  }, {});

  // Columns for the data table
  const columns = [
    {
      name: "Customer ID",
      selector: (row) => row.customerId,
      sortable: true,
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

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-star-half"
      breadcrumb="Rates & Reviews"
    >
      <div className="col-md-12"  style={{ backgroundColor: "#f0f0f0", paddingLeft: "20px", paddingRight: "20px" }}>
        {/* Display overall vendor rating */}
        <div className="mb-4 text-center">
          <br />
          <p style={{ fontWeight: "500", fontSize: "24px", color: "#333" }}>
            Overall Vendor Rating
          </p>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <div>{renderStars(ratings.average)}</div>
            <span className="ms-2" style={{ fontSize: "18px", color: "#333" }}>
              {ratings.average} / 5
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#777" }}>
            ({ratings.totalReviews} Reviews)
          </p>
        </div>

        {/* Display ratings and comments per product */}
        {Object.keys(groupedComments).map((productName, index) => (
          <div key={index} className="mb-4">
            <h4 style={{ fontSize: "20px", fontWeight: "500", color: "#333" }}>
              {productName}
            </h4>
            <DataTable
              columns={columns}
              data={groupedComments[productName]}
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
          </div>
        ))}
        <br /><br />
      </div>
    </Layout>
  );
};

export default VendorRates;

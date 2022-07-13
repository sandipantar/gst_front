import React, { useState, useEffect } from "react";
import Header from "../../Headers/Header";
import Topnav from "../../Headers/Topnav";
// import LoaderPage from "../LoaderPage";
import { searchGroupName } from "../../../crud/group.crud";
import { searchCatName } from "../../../crud/category.crud";
import { searchHsnName } from "../../../crud/hsn.crud";
import { searchUnitName } from "../../../crud/unit.crud";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../crud/product.crud";
import { Form, Button, Row, Col } from "react-bootstrap-v5";
import DataTable from "react-data-table-component-with-filter";
import "../../Assets/search.css";

const Product = () => {
  const [ products, setProducts ] = useState([]);
  const [ groups, setGroups ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ hsns, setHsns ] = useState([]);
  const [ units, setUnits ] = useState([]);
  const [ groupID, setGroupID ] = useState(0);
  const [ grpNm, setGrpNm ] = useState("");
  const [ catID, setCatID ] = useState(0);
  const [ catNm, setCatNm ] = useState("");
  const [ hsnID, setHsnID ] = useState(0);
  const [ hsnNm, setHsnNm ] = useState("");
  const [ unitID, setUnitID ] = useState(0);
  const [ untNm, setUntNm ] = useState("");
  const [ barcode, setBarcode ] = useState("");
  const [ size, setSize ] = useState("");
  const [ note, setNote ] = useState("");
  const [ productName, setProductName ] = useState("");
  const [ productSName, setProductSName ] = useState("");
  const [ minQuan, setMinQuan ]  = useState(0);
  const [ saleDisP, setSaleDisP ] = useState(0);
  const [ saleDisA, setSaleDisA ] = useState(0);
  const [ isDataLoaded, setIsDataLoaded ] = useState(true);
  const [ editIDproduct, setEditIDproduct ] = useState(0);
  // const [ filterText, setFilterText ]= useState('');
    
  useEffect(() => {
    fetchAllProducts().then(res => {
      setProducts(res.data);
      setIsDataLoaded(false);
    })
  }, []);

  const onTextChangedGroup = (srchtxt) => {
    if (srchtxt) {
      searchGroupName(srchtxt).then((res) => {
        if(res.data.length > 0) {
          setGroups(res.data);
          // console.log(res.data);
        } else alert('no group found');
      });
    }
  };
  const onGrpSugstionClick = (id,txt) => {
    console.log("gggggggggggggg=>>>>>>",txt);
    setGroupID(id);
    setGrpNm(txt);
    console.log("gggggggggggggg=>>>>>>",grpNm);
  }
  const onTextChangedCat = (srchtxt) => {
    if (srchtxt) {
      searchCatName(srchtxt).then((res) => {
        setCategories(res.data);
      });
    }
  };
  const onTextChangedHsn = (srchtxt) => {
    if (srchtxt) {
      searchHsnName(srchtxt).then((res) => {
        setHsns(res.data);
      });
    }
  };
  const onTextChangedUnit = (srchtxt) => {
    if (srchtxt) {
      searchUnitName(srchtxt).then((res) => {
        setUnits(res.data);
      });
    }
  };
  
  // const [ filteredItem, setFilteredItem ]= useState(units);

  const columns = [
    {
      name: "Barcode",
      selector: (row) => row.barcode,
      sortable: true,
      style: {
          maxWidth: '150px', // override the row height
      },
    },
    {
      name: "Product",
      selector: (row) => row.product_name,
      sortable: true,
      style: {
          maxWidth: '220px', // override the row height
      },
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa fa-edit mr-2 text-info"
            onClick={() =>
              editClicked(
                row.product_id,
                row.group,
                row.category,
                row.hsn,
                row.unit,
                row.barcode,
                row.product_size,
                row.note,
                row.product_name,
                row.product_short_name,
                row.min_quantity,
                row.saleDisP,
                row.saleDisA
              )
            }
          ></i>
          <i
            className="fa fa-trash text-danger"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete the Product?")
              ) {
                delProduct(row.product_id);
              }
            }}
          ></i>
        </>
      ),
    },
  ];
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const handleSubmitC = (e) => {
    // setIsDataLoaded(false);
    e.preventDefault();
    createProduct(
      groupID,
      catID,
      hsnID,
      unitID,
      barcode,
      productName,
      productSName,
      size,
      note,
      minQuan,
      saleDisP,
      saleDisA
    )
      .then((res) => {
        setGroupID(0);
        setGrpNm("");
        setCatID(0);
        setCatNm("");
        setHsnID(0);
        setHsnNm("");
        setUnitID(0);
        setUntNm("");
        setBarcode("");
        setSize("");
        setNote("");
        setProductName("");
        setProductSName("");
        setMinQuan(0);
        setSaleDisP(0);
        setSaleDisA(0);
        setIsDataLoaded(true);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const delProduct = (id) => {
    setIsDataLoaded(false);
    deleteProduct(id)
      .then((res) => {
        setIsDataLoaded(true);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editClicked = (
    prdID,
    grppp,
    cattt,
    hsnnn,
    unttt,
    bar,
    sizzz,
    nottt,
    prdnnn,
    prdnnns,
    minqqq,
    sldisppp,
    sldisaaa
  ) => {
    setGroupID(grppp.group_id);
    setGrpNm(grppp.group_name);
    setCatID(cattt.category_id);
    setCatNm(cattt.category_name);
    setHsnID(hsnnn.hsn_id);
    setHsnNm(hsnnn.hsn_user);
    setUnitID(unttt.unit_id);
    setUntNm(unttt.unit_name);
    setBarcode(bar);
    setSize(sizzz);
    setNote(nottt);
    setProductName(prdnnn);
    setProductSName(prdnnns);
    setMinQuan(minqqq);
    setSaleDisP(sldisppp);
    setSaleDisA(sldisaaa);
    setEditIDproduct(prdID);
  };
  const cancelEdit = () => {
    setGroupID(0);
    setGrpNm("");
    setCatID(0);
    setCatNm("");
    setHsnID(0);
    setHsnNm("");
    setUnitID(0);
    setUntNm("");
    setBarcode("");
    setSize("");
    setNote("");
    setProductName("");
    setProductSName("");
    setMinQuan(0);
    setSaleDisP(0);
    setSaleDisA(0);
    setIsDataLoaded(true);
    setEditIDproduct(0);
  };
  const handleSubmitE = (e) => {
    setIsDataLoaded(false);
    e.preventDefault();
    updateProduct(
      groupID,
      catID,
      hsnID,
      unitID,
      barcode,
      productName,
      productSName,
      size,
      note,
      minQuan,
      saleDisP,
      saleDisA
    )
      .then((res) => {
        setGroupID(0);
        setCatID(0);
        setHsnID(0);
        setUnitID(0);
        setBarcode("");
        setSize("");
        setNote("");
        setProductName("");
        setProductSName("");
        setMinQuan(0);
        setSaleDisP(0);
        setSaleDisA(0);
        setEditIDproduct(0);
        setIsDataLoaded(true);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sizeOnSet = (szVal) => {
    const prdName = 'asd';
    setSize(szVal);
    setProductName(prdName);
  }

  const handleKeyboardBTNPrd = (event) => {
      let keyVal = event.keyCode || event.which;
      if( (keyVal === 13) || keyVal === 39 ) {
          const form = event.target.form;
          const index = [...form].indexOf(event.target);
          form.elements[index + 1].select();
          // if((keyVal === 13) && (event.target.id="formUnitDesc")) {
          // }
          event.preventDefault();
      } else if( keyVal === 37) {
          const form = event.target.form;
          const index = [...form].indexOf(event.target);
          form.elements[index - 1].select();
          event.preventDefault();
      }
  };

  return (
    <>
      <div id="wrapper">
        <Header pageName="Product" />
        <div id="content-wrapper" className="d-flex flex-column ml-1 mr-1">
          <div id="content">
            <Topnav pageName="Product Page Entry" />
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                Product Name: <span className="text-success">{productName}</span>
                {editIDproduct ? (
                  <div className="cus-field-set mt-3">
                    <div
                      className="cus-legend font-medium"
                      id="unit-form-header"
                    >
                      Update Form
                    </div>
                    <Form onSubmit={handleSubmitE} className="mt-1">
                      <Row>
                        <Col className="col-6">
                          <Form.Group className="mb-3" controlId="formGroup">
                            <Form.Label>Group</Form.Label>
                            <Form.Control
                              type="text"
                              value={grpNm}
                              onChange={(e) => {
                                onTextChangedGroup(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter Group Name"
                            />
                            {/* { groups && <ListGroup> */}
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formCatagory">
                            <Form.Label>Catagory</Form.Label>
                            <Form.Control
                              type="text"
                              value={catNm}
                              onChange={(e) => {
                                onTextChangedCat(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter Category Name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formHSN">
                            <Form.Label>HSN / SAC Code</Form.Label>
                            <Form.Control
                              type="text"
                              value={hsnNm}
                              onChange={(e) => {
                                onTextChangedHsn(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter HSN Name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                              type="text"
                              value={untNm}
                              onChange={(e) => {
                                onTextChangedUnit(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter Unit Name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                              type="text"
                              value={size}
                              onChange={(e) => {
                                setSize(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Size of Product"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="col-6">
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control
                              type="text"
                              value={barcode}
                              onChange={(e) => {
                                setBarcode(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Barcode of Product"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                              type="text"
                              value={note}
                              onChange={(e) => {
                                setNote(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Note"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Minimum Quantity</Form.Label>
                            <Form.Control
                              type="number"
                              value={minQuan}
                              onChange={(e) => {
                                setMinQuan(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Minimum Quantity"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Row>
                              <Col md={6}>
                                <Form.Label>Discount (%)</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={saleDisP}
                                  onChange={(e) => {
                                    setSaleDisP(e.target.value);
                                  }}
                                  onKeyDown={handleKeyboardBTNPrd}
                                  placeholder="Note"
                                />
                              </Col>
                              <Col md={6}>
                                <Form.Label>Discount (A)</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={saleDisA}
                                  onChange={(e) => {
                                    setSaleDisA(e.target.value);
                                  }}
                                  onKeyDown={handleKeyboardBTNPrd}
                                  placeholder="Note"
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                          <div className="text-right mt-2 mb-2">
                            <Button
                              type="button"
                              className="btn btn-danger btn-sm px-3 font-mid-sm mr-2"
                              onClick={() => cancelEdit()}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              id="submit"
                              className="btn btn-info btn-sm px-3 font-mid-sm"
                            >
                              Update
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                ) : (
                  <div className="cus-field-set mt-3">
                    <div
                      className="cus-legend font-medium"
                      id="prod-form-header"
                    >
                      Entry Form
                    </div>
                    <Form onSubmit={handleSubmitC} className="mt-1">
                      <Row>
                        <Col className="col-6">
                          <Form.Group className="mb-3" controlId="formGroup">
                            <Form.Label>Group</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={grpNm}
                              onChange={(e) => {
                                onTextChangedGroup(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter Group Name"
                              onBlur={() => {
                                setTimeout(() => {
                                  setGroups([])
                                },100);
                              }}
                            />
                            {/* <div className="showSugstionOuterDiv"> */}
                              { groups && groups.map( (ggrrpp,ggid) => 
                                <div key={ggid} className="showSugstion" onClick={()=>onGrpSugstionClick(ggrrpp.group_id,ggrrpp.group_name)}>{ggrrpp.group_name}</div>
                              )}
                            {/* </div> */}
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formCatagory">
                            <Form.Label>Catagory</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={catNm}
                              onChange={(e) => {
                                onTextChangedCat(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter Category Name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formHSN">
                            <Form.Label>HSN / SAC Code</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={hsnNm}
                              onChange={(e) => {
                                onTextChangedHsn(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter HSN Name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={untNm}
                              onChange={(e) => {
                                onTextChangedUnit(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Enter Unit Name"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                              type="text"
                              value={size}
                              onChange={(e) => {
                                sizeOnSet(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Size of Product"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="col-6">
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control
                              type="text"
                              value={barcode}
                              onChange={(e) => {
                                setBarcode(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Barcode of Product"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                              type="text"
                              value={note}
                              onChange={(e) => {
                                setNote(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Note"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Minimum Quantity</Form.Label>
                            <Form.Control
                              type="number"
                              value={minQuan}
                              onChange={(e) => {
                                setMinQuan(e.target.value);
                              }}
                              onKeyDown={handleKeyboardBTNPrd}
                              placeholder="Minimum Quantity"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Row>
                              <Col md={6}>
                                <Form.Label>Discount (%)</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={saleDisP}
                                  onChange={(e) => {
                                    setSaleDisP(e.target.value);
                                  }}
                                  onKeyDown={handleKeyboardBTNPrd}
                                  placeholder="Note"
                                />
                              </Col>
                              <Col md={6}>
                                <Form.Label>Discount (A)</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={saleDisA}
                                  onChange={(e) => {
                                    setSaleDisA(e.target.value);
                                  }}
                                  // onKeyDown={handleKeyboardBTNPrd}
                                  placeholder="Note"
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                          <div className="text-right mt-2 mb-2">
                            <Button
                              type="submit"
                              className="btn btn-primary btn-sm px-3 font-mid-sm"
                            >
                              Save
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                )}
              </div>

              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="cus-field-set mt-3 p-0">
                  <div className="cus-legend font-medium">Product Data</div>
                  <div className="my-3">
                    <DataTable
                        columns={columns}
                        data={products}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        persistTableHead
                        expandableRows
                        progressPending={isDataLoaded}
                        expandableRowsComponent={ExpandedComponent}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;

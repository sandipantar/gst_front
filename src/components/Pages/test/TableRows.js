import React,{ useRef, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import AutoSelect from 'react-select';
import { Card,Row,Col,Form,Button,Tabs,Tab,Table,Badge,Modal,InputGroup,FormControl } from 'react-bootstrap-v5';
function TableRows({rowsData, deleteTableRows, handleChange}) {
    
    const [proshow, setProShow] = useState(false);
    const prohandleClose = () => setProShow(false);
    const prohandleShow = () => setProShow(true);

    return(
        
        rowsData.map((data, index)=>{
            const {sl, productName, hsn, invoiceNo, baseQty, baseUnit, altQty, altUnit, rate, discountPercentage, discount, amount, bagNo }= data;
            return(
            //     <tr key={index}>
            //     <td>
            //    <input type="text" value={fullName} onChange={(evnt)=>(handleChange(index, evnt))} name="fullName" className="form-control"/>
            //     </td>
            //     <td><input type="text" value={emailAddress}  onChange={(evnt)=>(handleChange(index, evnt))} name="emailAddress" className="form-control"/> </td>
            //     <td><input type="text" value={salary}  onChange={(evnt)=>(handleChange(index, evnt))} name="salary" className="form-control" /> </td>
            //     <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            // </tr>
            <tr key={index}>
            <td>1</td>
            <td>
                <Form.Group controlId="formPlaintextVnumber" onClick={prohandleShow}>
                    <Form.Control type="text" onChange={(evnt)=>(handleChange(index, evnt))} name="productName" value={productName}/>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Control type="text" onChange={(evnt)=>(handleChange(index, evnt))} name="hsn" value={hsn} disabled />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Control type="text" onChange={(evnt)=>(handleChange(index, evnt))} name="invoiceNo" value={invoiceNo} />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Control type="text" onChange={(evnt)=>(handleChange(index, evnt))} name="bagNo" value={bagNo} />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Control type="number" onChange={(evnt)=>(handleChange(index, evnt))} name="baseQty" value={baseQty} />
                </Form.Group>
            </td>
            <td style={{width:'8%'}}>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Select aria-label="Default select example" name="baseUnit" value={baseUnit} onChange={(evnt)=>(handleChange(index, evnt))}>
                        <option value="Kg">KG</option>
                        <option value="Gm">GM</option>
                    </Form.Select>
                </Form.Group>
            </td>
            <td>
            <Form.Group controlId="formPlaintextVnumber">
                    <Form.Control type="number" onChange={(evnt)=>(handleChange(index, evnt))} value={altQty} name="altQty"/>
                </Form.Group>
            </td>
            <td style={{width:'8%'}}>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Select aria-label="Default select example" name="altUnit" value={altUnit} onChange={(evnt)=>(handleChange(index, evnt))}>
                        <option value="Bag">BAG</option>
                        <option value="Pac">PAC</option>
                    </Form.Select>
                </Form.Group>
            </td>
            <td style={{width:'8%'}}>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Control type="number" onChange={(evnt)=>(handleChange(index, evnt))} value={rate} name="rate"/>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formPlaintextVnumber">
                    <Form.Control type="number" onChange={(evnt)=>(handleChange(index, evnt))} value={discountPercentage} name="discountPercentage"/>
                </Form.Group>
            </td>
            <td>
                <label>{discount}</label>
            </td>
            <td>
            <label>{amount}</label>
            </td>
            <td>
                <a className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</a>
            </td>
        </tr> 
            )
        })
   
    )
    
}
export default TableRows;
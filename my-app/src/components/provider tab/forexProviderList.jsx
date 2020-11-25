import React, {useEffect, useState} from 'react';
import axios from "axios";
import {DataGrid} from "@material-ui/data-grid";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useDispatch, useSelector} from "react-redux";
import setPreviousCurrency from "../actions/setPreviousCurrency";
import DataTable from "react-data-table-component";
import ScrollArea from 'react-scrollbar';
import Scrollbar from 'react-scrollbars-custom'

const column = [
    {
        name: "No",
        selector: "id",
        sortable: true
    },

    {
        name: "Provider",
        selector: "provider",
        sortable: true
    },

    {
        name: "Best Rate",
        selector: "high",
        sortable: true
    },
    {
        name: "Lowest Rate",
        selector: "low",
        sortable: true
    },
    {
        name: "Closing Rate",
        selector: "close",
        sortable: true
    },
    {
        name: "Opening Rate",
        selector: "open",
        sortable: true
    },

];

// const columns = [
//     {field: 'id', headerName: 'No', width: 60},
//     {field: 'provider', headerName: 'Forex Provider', width: 130},
//     {field: 'high', headerName: 'Best Rate', width: 130},
//     {field: 'low', headerName: 'Lowest Rate', width: 130},
//     {field: 'close', headerName: 'Closing Rate', width: 130},
//     {field: 'open', headerName: 'Opening Rate', width: 130},
// ];


let rows1 = [];
const defaultRow = [
    {
        id: 1,
        provider: 'PepperStone',
        high: 0.89859,
        low: 0.89477,
        close: 0.89521,
        open: 0.89816
    },
    {
        id: 2,
        provider: 'Oanda',
        high: 0.89858,
        low: 0.89444,
        close: 0.89475,
        open: 0.89764
    },
    {
        id: 3,
        provider: 'FxPro',
        high: 0.89858,
        low: 0.89475,
        close: 0.89518,
        open: 0.89778
    },
    {
        id: 4,
        provider: 'IC-Market',
        high: 0.89858,
        low: 0.89476,
        close: 0.89521,
        open: 0.89816
    },
    {
        id: 5,
        provider: 'ICM-Trader',
        high: 0.89853,
        low: 0.89471,
        close: 0.89537,
        open: 0.89789
    },
    {
        id: 6,
        provider: 'FXPIG',
        high: 0.89851,
        low: 0.89474,
        close: 0.89592,
        open: 0.89681
    }
]


function List() {

    const currencies = useSelector(state => state.currencyreducer);
    const [data, updateData] = useState([]);
    const [val,setVal]=useState("5");

    const handleChange=(e)=>{
       setVal(e.target.value);
    }

    useEffect(function () {
        async function fetchData() {
            if (currencies.srcCurrency) {
                let src = currencies.srcCurrency, tar = currencies.tarCurrency;
                console.log("inside useEffect = ", src, "  ", tar);
                const response = await axios.get("https://forexproviderapi.herokuapp.com/forexprovider/?IN=" + src + "&OUT=" + tar + "&TIME="+val);
                let value = response.data;
                console.log("inside fetchData = ", value);
                updateData(value);
            }

        }

        fetchData();

    }, [currencies.srcCurrency, currencies.tarCurrency,val])

    return (
        <div style={{}}>
           <FormControl component="fieldset">
                <FormLabel component="legend"/>
                <RadioGroup aria-label="duration" style={{display: "inline-block"}} name="duration" value={val}
                            onClick={handleChange}>
                    <FormControlLabel value="5" control={<Radio/>} label="Today"/>
                    <FormControlLabel value="7" control={<Radio/>} label="Week"/>
                    <FormControlLabel value="30" control={<Radio/>} label="Month"/>
                    <FormControlLabel value="365" control={<Radio/>} label="Year"/>
                </RadioGroup>
            </FormControl>
            <Scrollbar style={{ width: '100%', height: '46vh' }}>
           <div style={{height: '45vh', width: '100%'}}>
            {Object.keys(currencies).length === 0 && <DataTable
                title={"DETAILS"}
                columns={column}
                data={defaultRow}
                pagination
                // defaultSortField={'title'}
                // paginationResetDefaultPage={resetPaginationToggle}
                // subHeader
                // subHeaderComponent={subHeaderComponentMemo}
            />}
            {Object.keys(currencies).length !== 0 &&
            <DataTable
                title={"DETAILS"}
                columns={column}
                data={data}
                pagination
                // defaultSortField={'title'}
                // paginationResetDefaultPage={resetPaginationToggle}
                // subHeader
                // subHeaderComponent={subHeaderComponentMemo}
            />}
              
         </div>
         </Scrollbar>
        </div>
       
    );
}

export default List;

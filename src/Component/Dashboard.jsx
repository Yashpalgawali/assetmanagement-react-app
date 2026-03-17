import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import ComputerIcon from "@mui/icons-material/Computer";
import WarningIcon from "@mui/icons-material/Warning";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import { BarChart, PieChart } from "@mui/x-charts";
import { getAllAssets, getAllAssetsCount } from "../api/AssetApiClient";
import { getAllAssignedAssets, getAllEmployeesList } from "../api/EmployeeApiClient";
import AOS from "aos";
import "aos/dist/aos.css";

import { gsap } from "gsap";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

export default function Dashboard() {

  const [assetCount,setAssetCount] = useState('')
  const [assetTypeCount,setAssettypeCount] = useState('')
  const [employeeCount,setEmployeeCount] = useState('')

  const [assignedAssetsCount,setAssignedAssetsCount] = useState('')
  const [assetCategoryData,setAssetCategoryData] = useState([])

  const assetUsageData = [
    { month: "Jan", assets: 30 },
    { month: "Feb", assets: 40 },
    { month: "Mar", assets: 55 },
    { month: "Apr", assets: 35 },
    { month: "May", assets: 70 }
  ];

   

  const recentAssets = [
    { name: "Dell Latitude", category: "Laptop", assigned: "John" },
    { name: "HP LaserJet", category: "Printer", assigned: "Admin Dept" },
    { name: "Cisco Router", category: "Network", assigned: "IT Team" },
    { name: "MacBook Pro", category: "Laptop", assigned: "CEO" }
  ];

  useEffect(() => {
  AOS.init({ duration: 1000 });

  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 500); // 🔥 important
}, []);

   useEffect(()=>{
    AOS.init({ duration: 1000 });

    gsap.from(".gsap-card", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    });

     gsap.from(".chart-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3
      });
    Fancybox.bind("[data-fancybox]", {});

      getAllEmployeesList().then((response) => {          
          setEmployeeCount(response.data.length)
        })

        getAllAssetsCount().then((response) => {          
          setAssetCount(response.data)
        })
        getAllAssignedAssets().then((response) => {
            setAssignedAssetsCount(response.data.length)
        })
        getAllAssets().then((response) => {
            const formattedData = response.data.map((item, index) => ({
              id: index,
              value: Number(item.quantity),
              label: item.atype.type_name
            }));
             
          setAssetCategoryData(formattedData);
        });
        
      }, [])

  const StatCard = ({ title, value, icon }) => (
    <Card elevation={3} data-aos="fade-down">
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {icon}
        <Box>
          <Typography variant="h6">{value}</Typography>
          <Typography color="text.secondary">{title}</Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box p={3}>

      <Typography variant="h4" mb={3} fontWeight="bold" data-aos="fade-left">
        Asset Management Dashboard
      </Typography>

      {/* KPI CARDS */}

      <Grid container spacing={3} mb={4}>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Assets"
            value={assetCount}
            icon={<InventoryIcon color="primary" sx={{ fontSize: 40 }} />}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Assigned Assets"
            value={assignedAssetsCount}
            icon={<ComputerIcon color="success" sx={{ fontSize: 40 }} />}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Employees"
            value={employeeCount}
            icon={<PersonIcon color="warning" sx={{ fontSize: 40 }} />}
          />
        </Grid>
  
        <Grid item xs={12} md={3}>
          <StatCard
            title="Asset Value"
            value="$1.2M"
            icon={<AttachMoneyIcon color="secondary" sx={{ fontSize: 40 }} />}
          />
        </Grid>

      </Grid>

      {/* CHARTS */}

      <Grid container spacing={3}>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}
            data-aos="fade-up"
          >
            <Typography variant="h6" mb={2}>
              Asset Allocation Trend
            </Typography>

            <BarChart
              xAxis={[{ scaleType: "band", data: assetUsageData.map(d => d.month) }]}
              series={[{ data: assetUsageData.map(d => d.assets) }]}
              height={300}
            />
          </Paper>
        </Grid>

 
        <Grid item xs={12} md={5}>
          {/* <Paper sx={{ p: 2 }}
            className="chart-card"
          > */}
              <Paper
              data-aos="fade-left"
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 }
              }}
          >
            <Typography variant="h6" mb={2}>
              Asset Categories
            </Typography>

            <PieChart
              series={[
                {
                  data: assetCategoryData
                }
              ]}
              width={300}   // ✅ add this
              height={300}
            />
           
          </Paper>
        </Grid>

      </Grid>

      {/* RECENT ASSETS */}

      <Box mt={4}>
        <Paper sx={{ p: 2 }}
           data-aos="fade-up"
        >
          <Typography variant="h6" mb={2}>
             <AssignmentTurnedInIcon /> Recently Assigned Assets
          </Typography>

          <Table>

            <TableHead>
              <TableRow>
                <TableCell>Asset Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Assigned To</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {recentAssets.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.assigned}</TableCell>
                </TableRow>
              ))}

            </TableBody>

          </Table>

        </Paper>
      </Box>

    </Box>
  );
}
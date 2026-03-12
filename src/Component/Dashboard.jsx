import React from "react";
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
  TableBody
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import ComputerIcon from "@mui/icons-material/Computer";
import WarningIcon from "@mui/icons-material/Warning";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { BarChart, PieChart } from "@mui/x-charts";

export default function Dashboard() {

  const assetUsageData = [
    { month: "Jan", assets: 30 },
    { month: "Feb", assets: 40 },
    { month: "Mar", assets: 55 },
    { month: "Apr", assets: 35 },
    { month: "May", assets: 70 }
  ];

  const assetCategoryData = [
    { id: 0, value: 45, label: "Laptops" },
    { id: 1, value: 25, label: "Desktops" },
    { id: 2, value: 15, label: "Printers" },
    { id: 3, value: 15, label: "Networking" }
  ];

  const recentAssets = [
    { name: "Dell Latitude", category: "Laptop", assigned: "John" },
    { name: "HP LaserJet", category: "Printer", assigned: "Admin Dept" },
    { name: "Cisco Router", category: "Network", assigned: "IT Team" },
    { name: "MacBook Pro", category: "Laptop", assigned: "CEO" }
  ];

  const StatCard = ({ title, value, icon }) => (
    <Card elevation={3}>
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

      <Typography variant="h4" mb={3} fontWeight="bold">
        Asset Management Dashboard
      </Typography>

      {/* KPI CARDS */}

      <Grid container spacing={3} mb={4}>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Assets"
            value="520"
            icon={<InventoryIcon color="primary" sx={{ fontSize: 40 }} />}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Assigned Assets"
            value="430"
            icon={<ComputerIcon color="success" sx={{ fontSize: 40 }} />}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Maintenance"
            value="32"
            icon={<WarningIcon color="warning" sx={{ fontSize: 40 }} />}
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
          <Paper sx={{ p: 2 }}>
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
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              Asset Categories
            </Typography>

            <PieChart
              series={[
                {
                  data: assetCategoryData
                }
              ]}
              height={300}
            />
          </Paper>
        </Grid>

      </Grid>

      {/* RECENT ASSETS */}

      <Box mt={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>
            Recently Assigned Assets
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
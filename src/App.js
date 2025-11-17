// ✅ src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import Layout from "./components/Layout";
import CashierLayout from "./components/CashierLayout";
import RoleRedirect from "./components/RoleRedirect";
import DashboardPage from "./pages/DashboardPage";
import ShopsPage from "./pages/ShopsPage";
import InventoryPage from "./pages/InventoryPage";
import PurchasesPage from "./pages/PurchasesPage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import UserManagementPage from "./pages/UserManagementPage";
import CashierPage from "./pages/CashierPage";
import SalesHistoryPage from "./pages/SalesHistoryPage";
import SaleDetailPage from "./pages/SaleDetailPage";
import RecordExpensePage from "./pages/RecordExpensePage";
import CreateExpenseCategoryPage from "./pages/CreateExpenseCategoryPage";
import CreatePurchaseOrderPage from "./pages/CreatePurchaseOrderPage";
import AddPurchaseOrderItemPage from "./pages/AddPurchaseOrderItemsPage";
import AddOrderExpensePage from "./pages/AddPurchaseOrderExpensesPage";
import PurchaseOrdersDashboardPage from "./pages/PurchaseOrdersDashboardPage";
import AddProductPage from "./pages/AddProductPage";
import AdjustPricePage from "./pages/AdjustPricePage";
import StockAdjustmentPage from "./pages/StockAdjustmentPage";
import StockTransferPage from "./pages/StockTransferPage";
import StockLogPage from "./pages/StockLogPage";
import LoginPage from "./pages/LoginPage";
import ShopStockPage from "./pages/ShopStockPage";

import "./theme.css";

/* ============================================================
   🔒 Route Protection
   ============================================================ */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "Session Expired",
      text: "Please log in again.",
      timer: 2000,
      showConfirmButton: false,
    });
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !roles.some((r) => allowedRoles.includes(r))) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You do not have permission to access this section.",
      timer: 2000,
      showConfirmButton: false,
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

/* ============================================================
   🌐 MAIN APP ROUTING
   ============================================================ */
export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🚦 Auto Redirect by Role */}
        <Route path="/redirect" element={<RoleRedirect />} />

        {/* 🚫 Unauthorized */}
        <Route
          path="/unauthorized"
          element={
            <h2 style={{ textAlign: "center", marginTop: "80px", color: "#c00" }}>
              🚫 Access Denied
            </h2>
          }
        />

        {/* ============================================================
           🧭 ADMIN & SUPERADMIN ROUTES
        ============================================================ */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/shops"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <ShopsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

         <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <InventoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />

         <Route
          path="/expenses"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <ExpensesPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin adds products */}
        <Route
          path="/inventory/add"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <AddProductPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Adjust Price → Supervisor or Admin */}
        <Route
          path="/inventory/adjust-price"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR", "ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <AdjustPricePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Stock Adjustment → Admin only */}
        <Route
          path="/inventory/adjust-stock"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <StockAdjustmentPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Stock Transfer → Supervisor only */}
        <Route
          path="/inventory/transfer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR", "ROLE_ADMIN"]}>
              <Layout>
                <StockTransferPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Stock Logs → Supervisor & Admin */}
        <Route
          path="/inventory/logs"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR", "ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <StockLogPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin creates expense categories */}
        <Route
          path="/expenses/create"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <CreateExpenseCategoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Reports, Settings, User Management */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <ReportsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/users"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
              <Layout>
                <UserManagementPage />
              </Layout>
            </ProtectedRoute>
          }
        />
       
<Route
  path="/purchases/dashboard"
  element={
    <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]}>
      <Layout>
        <PurchaseOrdersDashboardPage />
      </Layout>
    </ProtectedRoute>
  }
/>


<Route
  path="/inventory/shop-stock"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ROLE_SUPERVISOR",
        "ROLE_ADMIN",
        "ROLE_SUPERADMIN",
      ]}
    >
      <Layout>
        <ShopStockPage />
      </Layout>
    </ProtectedRoute>
  }
/>

        {/* ============================================================
           🧾 SUPERVISOR ROUTES
        ============================================================ */}
        <Route
          path="/purchases"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR"]}>
              <Layout>
                <PurchasesPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase-orders/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR"]}>
              <Layout>
                <PurchaseOrdersDashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase-orders/create"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR"]}>
              <Layout>
                <CreatePurchaseOrderPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase-orders/items/add"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR"]}>
              <Layout>
                <AddPurchaseOrderItemPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase-orders/expenses/add"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR"]}>
              <Layout>
                <AddOrderExpensePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Record and view expenses (Supervisor & Cashier) */}
        <Route
          path="/expenses"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR", "ROLE_CASHIER"]}>
              <Layout>
                <ExpensesPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses/record"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR", "ROLE_CASHIER"]}>
              <Layout>
                <RecordExpensePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Supervisor’s inventory view */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["ROLE_SUPERVISOR"]}>
              <Layout>
                <InventoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route
  path="/inventory/shop-stock"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ROLE_SUPERVISOR",
        "ROLE_ADMIN",
        "ROLE_SUPERADMIN",
      ]}
    >
      <Layout>
        <ShopStockPage />
      </Layout>
    </ProtectedRoute>
  }
/>

        {/* ============================================================
           💵 CASHIER ROUTES
        ============================================================ */}
        <Route
          path="/cashier"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CASHIER"]}>
             
                <CashierPage />
              
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales/history"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CASHIER", "ROLE_ADMIN","ROLE_SUPERADMIN"]}>
              <Layout>
                <SalesHistoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales/:saleId"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CASHIER"]}>
              <SaleDetailPage />
            </ProtectedRoute>
          }
        />

        {/* ============================================================
           🧭 CATCH-ALL
        ============================================================ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
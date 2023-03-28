import React from "react";
import EmployeeData from "../tab-employee-detail/EmployeeData";
import EmployeeDataIdentity from "../tab-employee-detail/EmployeeDataIdentity";
import EmployementData from "../tab-employee-detail/EmploymentData";
import { Fragment } from "react";
import TabWithoutPermission from "../../../component/TabWithoutPermission";

const GeneralData = ({
  employeeData,
  onEditClick,
  isDisabled,
  onChangeForm,
  onChangeSelectForm,
  selectForm,
  isFetching,
  onChangeExists,
  isValidEmail,
  errorExistType,
  onSubmitEdit,
  onChangeCheckbox,
  isLoadingEdit,
  isPermanendIdCard,
  isSameAddress,
  departmentData,
}) => {
  const dataTabs = [
    {
      tabName: "personal-data",
      label: "Personal Data",
      components: (
        <EmployeeData
          employeeData={employeeData}
          selectForm={selectForm}
          isFetching={isFetching}
          onChangeExists={onChangeExists}
          isValidEmail={isValidEmail}
          errorExistType={errorExistType}
          isLoadingEdit={isLoadingEdit}
          key={0}
          submitEdit={onSubmitEdit}
          isDisabled={isDisabled}
          onEditClick={onEditClick}
          onChange={onChangeForm}
          onChangeSelect={onChangeSelectForm}
        />
      ),
    },
    {
      tabName: "identity-data",
      label: "Identity & Address",
      components: (
        <EmployeeDataIdentity
          employeeData={employeeData}
          selectForm={selectForm}
          isFetching={isFetching}
          isLoadingEdit={isLoadingEdit}
          onChangeCheckbox={onChangeCheckbox}
          submitEdit={onSubmitEdit}
          isDisabled={isDisabled}
          onEditClick={onEditClick}
          onChange={onChangeForm}
          onChangeSelect={onChangeSelectForm}
          isPermanentIdCard={isPermanendIdCard}
          isSameAddress={isSameAddress}
          key={1}
        />
      ),
    },
    {
      tabName: "employment",
      label: "Employment",
      components: (
        <EmployementData
          isDisabled={isDisabled}
          employeeData={employeeData}
          onEditClick={onEditClick}
          onChangeSelect={onChangeSelectForm}
          onChange={onChangeForm}
          isFetching={isFetching}
          isLoadingEdit={isLoadingEdit}
          selectForm={selectForm}
          errorExistType={errorExistType}
          departmentData={departmentData}
          submitEdit={onSubmitEdit}
          onChangeExists={onChangeExists}
          key={2}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <TabWithoutPermission tabs={dataTabs} />
    </Fragment>
  );
};

export default GeneralData;

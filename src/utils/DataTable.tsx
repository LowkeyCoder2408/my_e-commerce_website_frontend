import React from 'react';
import {
  DataGrid,
  GridLocaleText,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { styled } from '@mui/material';

interface DataTableProps {
  rows: any;
  columns: any;
  title: string;
}

const CustomExportButton = styled('div')(({ theme }) => ({
  '& *': {
    fontSize: '1.4rem !important',
    textTransform: 'uppercase',
  },
}));

function CustomToolbar({ title }: { title: string }) {
  return (
    <GridToolbarContainer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        className="ms-4 pt-4 pb-2"
        style={{
          fontSize: '1.7rem',
          fontWeight: '600',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div
        className="me-2 pt-3"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <CustomExportButton>
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </CustomExportButton>
      </div>
    </GridToolbarContainer>
  );
}

const customLocaleText: Partial<GridLocaleText> = {
  toolbarExport: 'Xuất file',
  toolbarFilters: 'Bộ lọc',
  toolbarExportCSV: 'Tải tệp CSV',
  toolbarExportPrint: 'In',
  footerRowSelected: (count) => `${count} hàng đã được chọn`,
  filterPanelAddFilter: 'Thêm bộ lọc',
  filterPanelDeleteIconLabel: 'Xóa',
  filterPanelLogicOperator: 'Toán tử logic',
  filterPanelOperator: 'Toán tử',
  filterPanelOperatorAnd: 'Và',
  filterPanelOperatorOr: 'Hoặc',
  filterPanelColumns: 'Cột',
  filterPanelInputLabel: 'Giá trị',
  filterPanelInputPlaceholder: 'Lọc theo giá trị',
  filterOperatorContains: 'Chứa',
  filterOperatorDoesNotContain: 'Không chứa',
  filterOperatorEquals: 'Bằng',
  filterOperatorDoesNotEqual: 'Không bằng',
  filterOperatorIsEmpty: 'Trống',
  filterOperatorIsNotEmpty: 'Không trống',
  filterOperatorStartsWith: 'Bắt đầu bằng',
  filterOperatorEndsWith: 'Kết thúc bằng',
  filterOperatorIsAnyOf: 'Là bất kỳ trong số',
};

export const DataTable: React.FC<DataTableProps> = (props) => {
  const columnsWithCenterAlignment = props.columns.map((column: any) => ({
    ...column,
    headerAlign: 'center',
  }));

  return (
    <div
      style={{
        width: '100%',
        height: props.rows.length > 0 ? 'auto' : '200px',
      }}
    >
      <DataGrid
        rows={props.rows}
        columns={columnsWithCenterAlignment}
        checkboxSelection
        slots={{
          toolbar: () => <CustomToolbar title={props.title} />,
        }}
        slotProps={{
          pagination: {
            labelRowsPerPage: 'Số hàng mỗi trang',
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} trong ${count}`,
          },
          filterPanel: {
            sx: {
              '& .MuiInputLabel-root, .MuiSelect-select, .MuiInput-input': {
                fontSize: '1.6rem',
              },

              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
              },
            },
          },
        }}
        sx={{
          backgroundColor: '#fff',
          fontSize: '1.4rem',
          '& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount, .MuiTablePagination-selectLabel':
            {
              fontWeight: 'bold',
              fontSize: '1.4rem',
              marginY: '0px',
            },

          '& .MuiTablePagination-displayedRows, .MuiTablePagination-input': {
            fontSize: '1.4rem',
            marginY: '0px',
          },

          '& .MuiDataGrid-scrollbar': {
            height: '4px',
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        localeText={customLocaleText}
        autoHeight
      />
    </div>
  );
};

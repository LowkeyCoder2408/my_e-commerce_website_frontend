import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import OrderModel from '../../../models/OrderModel';

const CustomStepLabel = styled(StepLabel)<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ ownerState }) => ({
  '& .MuiStepLabel-label': {
    fontSize: '1.4rem',
    color: ownerState.completed
      ? '#007dc0 !important'
      : ownerState.active
        ? '#007dc0 !important'
        : '#a2a2a4',
  },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#007dc0',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#007dc0',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#a2a2a4',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#dbdbdb',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#007dc0',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#007dc0',
      zIndex: 1,
      fontSize: 24,
    },
    '& .QontoStepIcon-circle': {
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed || active ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

interface OrderStatusProps {
  order?: OrderModel;
}

export default function OrderStatus(props: OrderStatusProps) {
  let steps: string[] = [];
  let activeStep = 0;

  if (props.order?.paymentMethodName === 'COD') {
    steps = [
      'Vừa khởi tạo',
      'Đang xử lý',
      'Đã đóng gói',
      'Shipper đã nhận hàng',
      'Đang giao hàng',
      'Đã được giao',
      'Đã thanh toán',
    ];
  } else if (props.order?.paymentMethodName === 'VNPay') {
    steps = [
      'Vừa khởi tạo',
      'Đã thanh toán',
      'Đang xử lý',
      'Đã đóng gói',
      'Shipper đã nhận hàng',
      'Đang giao hàng',
      'Đã được giao',
    ];
  } else {
    steps = ['Trạng thái không xác định'];
  }

  if (props.order?.status) {
    activeStep = steps.indexOf(props.order.status);
  }

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <CustomStepLabel
              StepIconComponent={QontoStepIcon}
              ownerState={{
                active: index === activeStep,
                completed: index < activeStep,
              }}
            >
              {label}
            </CustomStepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

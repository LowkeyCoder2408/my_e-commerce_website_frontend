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
import { Box } from '@mui/material';

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

const ReturnStepLabel = styled(StepLabel)<{
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

// Custom connector for the steps
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

// Custom StepIcon to show a tick or a circle
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

// Custom StepIcon for the return steps (numbers for non-active/completed, tick for active/completed)
const ReturnStepIconRoot = styled('div')<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#dbdbdb',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  ...(ownerState.active && {
    color: '#007dc0',
  }),
  ...(ownerState.completed && {
    color: '#007dc0',
  }),
  '& .ReturnStepIcon-completedIcon': {
    color: '#007dc0',
    zIndex: 1,
    fontSize: 24,
  },
  '& .ReturnStepIcon-circle': {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .ReturnStepIcon-number': {
    fontSize: '1.4rem',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
}));

function ReturnStepIcon(props: StepIconProps & { index: number }) {
  const { active, completed, index, className } = props;

  return (
    <ReturnStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {completed || active ? (
        <Check className="ReturnStepIcon-completedIcon" />
      ) : (
        <div className="ReturnStepIcon-circle">
          <span className="ReturnStepIcon-number">{index + 1}</span>
        </div>
      )}
    </ReturnStepIconRoot>
  );
}

interface OrderStatusProps {
  order?: OrderModel;
}

export default function OrderStatus(props: OrderStatusProps) {
  let steps: string[] = [];
  let returnSteps: string[] = [
    'Yêu cầu hoàn trả',
    'Đã hoàn trả',
    'Đã hoàn tiền',
  ];
  let activeStep = 0;
  let activeReturnStep = 0;

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
    activeReturnStep = returnSteps.indexOf(props.order.status);
  }

  return (
    <>
      <Stack sx={{ width: '100%', fontSize: '1.4rem' }} spacing={4}>
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
      {props.order?.status === 'Yêu cầu hoàn trả' ||
      props.order?.status === 'Đã hoàn trả' ||
      props.order?.status === 'Đã hoàn tiền' ? (
        <Box sx={{ width: '100%', fontSize: '1.4rem', mt: 4 }}>
          <Stepper
            activeStep={activeReturnStep}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {returnSteps.map((label, index) => (
              <Step key={label}>
                <ReturnStepLabel
                  ownerState={{
                    active: index === activeReturnStep,
                    completed: index < activeReturnStep,
                  }}
                  StepIconComponent={(props) => (
                    <ReturnStepIcon {...props} index={index} />
                  )}
                >
                  {label}
                </ReturnStepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

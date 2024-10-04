import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';

const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description:
      'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
    author: { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    tag: 'Product',
    title: 'Innovative product features that drive success',
    description:
      'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
    author: { name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' },
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    tag: 'Design',
    title: 'Designing for the future: trends and insights',
    description:
      'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
    author: { name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' },
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    tag: 'Company',
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    author: { name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' },
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Engineering',
    title: 'Pioneering sustainable engineering solutions',
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    author: { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    tag: 'Product',
    title: 'Maximizing efficiency with our latest product updates',
    description:
      'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
    author: { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
  },
];

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ author }: { author: { name: string; avatar: string } }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={author.name}
          src={author.avatar}
          sx={{ width: 24, height: 24 }}
        />
        <Typography fontSize="1.2rem" variant="caption">
          {author.name}
        </Typography>
      </Box>
      <Typography fontSize="1.4rem" variant="caption">
        July 14, 2021
      </Typography>
    </Box>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Tìm kiếm bài đăng..."
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon fontSize="medium" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
        style={{ fontSize: '1.3rem' }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip
            onClick={handleClick}
            style={{ fontSize: '1.6rem' }}
            label="Company"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            style={{ fontSize: '1.6rem' }}
            label="Product"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            style={{ fontSize: '1.6rem' }}
            label="Design"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            style={{ fontSize: '1.6rem' }}
            label="Engineering"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="medium" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[0].img}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                sx={{ fontSize: '1.4rem' }}
              >
                {cardData[0].tag}
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1.8rem' }}
                component="div"
              >
                <strong>{cardData[0].title}</strong>
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
                style={{ fontSize: '1.2rem' }}
              >
                {cardData[0].description}
              </StyledTypography>
            </SyledCardContent>
            <Author author={cardData[0].author} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[1].img}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                sx={{ fontSize: '1.4rem' }}
              >
                {cardData[1].tag}
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1.8rem' }}
                component="div"
              >
                <strong>{cardData[1].title}</strong>
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                style={{ fontSize: '1.2rem' }}
                gutterBottom
              >
                {cardData[1].description}
              </StyledTypography>
            </SyledCardContent>
            <Author author={cardData[1].author} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[2].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                sx={{ fontSize: '1.4rem' }}
              >
                {cardData[2].tag}
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1.8rem' }}
                component="div"
              >
                <strong>{cardData[2].title}</strong>
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
                style={{ fontSize: '1.2rem' }}
              >
                {cardData[2].description}
              </StyledTypography>
            </SyledCardContent>
            <Author author={cardData[2].author} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ fontSize: '1.3rem' }}
                  >
                    {cardData[3].tag}
                  </Typography>
                  <Typography
                    gutterBottom
                    style={{ fontSize: '1.5rem' }}
                    component="div"
                  >
                    <strong>{cardData[3].title}</strong>
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    style={{ fontSize: '1.2rem' }}
                  >
                    {cardData[3].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author author={cardData[3].author} />
            </SyledCard>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ fontSize: '1.3rem' }}
                  >
                    {cardData[4].tag}
                  </Typography>
                  <Typography
                    gutterBottom
                    style={{ fontSize: '1.5rem' }}
                    component="div"
                  >
                    <strong>{cardData[4].title}</strong>
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    style={{ fontSize: '1.2rem' }}
                  >
                    {cardData[4].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author author={cardData[4].author} />
            </SyledCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[5].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography
                gutterBottom
                variant="caption"
                component="div"
                sx={{ fontSize: '1.4rem' }}
              >
                {cardData[5].tag}
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1.8rem' }}
                component="div"
              >
                <strong>{cardData[5].title}</strong>
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
                style={{ fontSize: '1.2rem' }}
              >
                {cardData[5].description}
              </StyledTypography>
            </SyledCardContent>
            <Author author={cardData[5].author} />
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import { CircularProgress } from '@mui/material';
import { GetPosts } from "./../api/index.js";

const Container = styled.div`
  height = 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  @media(min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media(max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setPosts(res?.data?.data);
        setFilteredPosts(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
    }
    const filteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(search.toString().toLowerCase());
      const authorMatch = post?.author?.toLowerCase().includes(search.toString().toLowerCase());
      return promptMatch || authorMatch;
    });

    if (search) {
      setFilteredPosts(filteredPosts);
    }
  }, [posts, search]);


  // const sampleImages = [
  //   {
  //     photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  //     name: "John Doe",
  //     prompt: "a calm forest trail during autumn"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  //     name: "Liam Brown",
  //     prompt: "a futuristic city at night"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
  //     name: "Olivia Smith",
  //     prompt: "a cat sitting on a windowsill in soft morning light"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  //     name: "Noah Davis",
  //     prompt: "a desert road stretching into the horizon"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
  //     name: "Sophia Lee",
  //     prompt: "a rainy street in Tokyo lit by neon signs"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
  //     name: "Mason Green",
  //     prompt: "a coffee cup on a table in a cozy cafe"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
  //     name: "Isabella Moore",
  //     prompt: "a person walking alone in the snow"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
  //     name: "Lucas Martin",
  //     prompt: "a library with tall wooden shelves and warm lighting"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1535930749574-1399327ce78f",
  //     name: "Mia Taylor",
  //     prompt: "a waterfall cascading into a tropical pool"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  //     name: "Amelia Thomas",
  //     prompt: "a bowl of ramen on a wooden table"
  //   },
  //   {
  //     photo: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
  //     name: "Henry Walker",
  //     prompt: "a hiker standing on top of a cliff looking down at the valley"
  //   }
  // ];


  return (
    <div style={{ minHeight: "100vh" }}>
      <Container>
        <Headline>
          Explore popular posts in the Community!
          <Span>⦿ Generated with AI ⦿</Span>
        </Headline>
        <SearchBar search={search} setSearch={setSearch} />
        <Wrapper>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {loading ? (
            <CircularProgress />
          ) : (
            <CardWrapper>
              {filteredPosts.length === 0 ? (
                <>
                  {/* {sampleImages.map((item, index) => (
                    <ImageCard key={index} item={item} />
                  ))} */}
                  No posts found
                </>
              ) : (
                <>
                  {filteredPosts
                    .slice()
                    .reverse()
                    .map((item, index) => {
                      <ImageCard key={index} item={item} />
                    })
                  }
                </>
              )
              }
            </CardWrapper>
          )}

        </Wrapper>
      </Container >
    </div>
  )
}

export default Home
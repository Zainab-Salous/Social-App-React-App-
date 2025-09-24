import React from 'react'
import PostsList from './../../../components/posts/PostsList';
import Add from '../../../components/posts/Add';
import ProfileCard from '../../../components/profile/ProfileCard';

export default function Profile() {
  
  return (
    <>
    <Add/>
    <ProfileCard />
    <PostsList isHome={false}/>
    </>
  )
}

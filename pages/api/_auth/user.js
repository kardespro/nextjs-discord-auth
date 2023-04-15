// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios'

export default async function handler(
  req,res
) {
  if(req.method !== "GET") return res.json({ status: 405, message: "405. Method Not Allowed", id: "", username:"", avatarURL: "", discriminator: "", avatar: ""})
  let _userReq = req.query
  if(!_userReq.token) return res.status(200).json({ status: 404, message: "404",id: "", username:"", avatarURL: "", discriminator: "", avatar: ""})
  let data = await axios.get("https://discord.com/api/v9/users/@me", { headers: { "Authorization": `Bearer ${_userReq.token}`}}).catch(err => res.status(200).json({ status: 401, message: "401", id: "", username:"", avatarURL: "", discriminator: "", avatar: ""}))
  if(data.status === 401) return res.json({ status: 401, message: "401. Token Incorrect"})
  res.status(200).json({
    status: 200,
    message: "200, Token Correct",
    id: data.data.id,
    username: data.data.username,
    discriminator: data.data.discriminator,
    avatarURL: `https://cdn.discordapp.com/avatars/${data.data.id}/${data.data.avatar}`,
    avatar: data.data.avatar
  })
  
}

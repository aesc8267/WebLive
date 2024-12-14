
<!-- Detail of Room -->
<template>
  <div id="openRoomInfo" ref="openRoomInfoDiv">
    <img id="roomCover" ref="roomCover" src="" />
    <div id="roomText">
      <div id="roomTitle" ref="roomTitle"></div>
      <textarea id="roomSummary" ref="roomSummary" rows="3" cols="32" readonly></textarea>
      <div id="nodeInfo">
        <div id="stable">
          <button id="hostBlock" @click="echoNodesMap(nodesMap[9], 0, nodesMap[7], 1)">
            Host Node
          </button>
           <button id="refreshMap" @click="indexRefreshMap(1)">Refresh</button>
        </div>
        <div id="block0" ref="block0"></div>
        <div id="block1" ref="block1"></div>
      </div>
    </div>
    <div>
      <button id="autoJoin" class="actionButton" @click="autoJoin(2)">auto<br />Join</button>
      <button id="closeInfo" class="actionButton" @click="openRoomInfo">Close</button>
    </div>
  </div>
  <!-- Host Setting -->
  <div id="liveSetting">
    <div id="liveInputBox" style="height: 100%; width: 100%; margin-top: 2%">
      Room Title :
      <input type="text" id="liveTitle" ref="liveTitle" class="liveInput" placeholder="Room Title" /><br />
      Cover URL:
      <input type="text" id="liveCoverURL" ref="liveCoverURL" class="liveInput"
        placeholder="URL of img served as Cover" /><br />
      Summary :
      <textarea id="LiveSummary" ref="LiveSummary" name="roomSummary" rows="5" cols="20"
        placeholder="Input your Summary there..."></textarea><br />
      <!-- Notice: Upload Room Cover only become available after created room<br> -->
      <!-- Cover:<select id="roomCover" onchange="inputCoverURL(this.selectedIndex)">
<option value="null" selected="selected">Custome</option>
<option value="0">Live</option>
<option value="1">FiveOnline</option>
<option value="2">Multiplay</option>
</select><br> -->
    </div>
    <div>
      Options:<br />
      1.pravite<input type="checkbox" id="ifPravite" ref="ifPravite" /><br />
      2.Room Type:<select id="roomType" ref="roomType">
        <option value="0" selected>Live</option>
        <option value="1">FiveOnline</option>
        <!-- <option value="2">Multiplay</option> -->
      </select>
    </div>
    <div>
      <button id="createRoom" class="actionButton" @click="buttonCreateRoom">Create Room</button>
      <button id="closeLiveMenu" class="actionButton" @click="showLive">Close</button>
    </div>
  </div>
  <!-- Control Panel -->
  <div class="container" id="control" style="height: 25%">
    <!-- Join a live web -->
    <div class="box">
      <div id="myid" style="font-weight: bold">Connecting to PeerServer...</div>
      <br />

      <div style="font-weight: bold; font-size: 20px">Direct Connect to Room:</div>
      <input type="text" id="directConnectId" ref="directConnectId" placeholder="Input room Id..." />
      <button id="directConnectButton" @click="buttonDirectConnect">GoTo</button><br />

      <div style="font-weight: bold; font-size: 32px">
        Rooms List:
        <button id="live" @click="showLive">Create Room</button>
      </div>
      Display Room Type:<select id="roomSort" ref="roomSort" @change="appearRooms">
        <option value="" selected>All</option>
        <option value="0">Live</option>
        <option value="1">FiveOnline</option>
        <option value="2">Multiplay</option>
      </select>
    </div>
    <div class="box">
      <!-- <button onclick="changeTheme()">Dark - Light Mode</button><br> -->
      <button @click="echoHistoricalConnectedId">console.log( Historical Connected Ids )</button><br />
      <button @click="defaultConnect">Click me to connect the deafult Root Id</button><br />
      <button @click="peer!.reconnect">Reconnect to Peer Server</button><br />
      <!-- <input type="checkbox" id="ifAutoReconnect" checked="checked">Automatic Reconnect when connection closed<br> -->
      <!-- Connect box -->
      <div id="connectRoot" style="visibility: hidden">
        Join a root node:<input type="text" ref="peerId" id="peerId" placeholder="Input counterpart's Id"
          autofocus="true" />
        <button id="connectButton" @click="buttonConnect">Connect</button><br />
      </div>
      <div id="status" ref="status" style="font-weight: bold">
        Status: Connecting to PeerServer...
      </div>
    </div>
  </div>
  <div id="rooms" ref="roomsDiv" v-if="rooms.length">
    <div v-for="(room, index) in filteredRooms" :key="index"
      :style="{ backgroundImage: 'url($room[6])', backgroundSize: 'contain' }" @click="displayRoomInfo(index)"
      ref="roomFor">
      <span>{{ room[4] }}</span>
      <span class="members-count" style="position: absolute; bottom: 0"></span>
      Members: {{ room[2].length }}
    </div>
  </div>
</template>
<script lang="ts" setup name="App">
/* eslint-disable */
import { onMounted, ref, computed } from 'vue'
import { Peer, DataConnection } from 'peerjs'
let lastTemporaryChosedNodes = new Array()
let temporaryChosedNodes = new Array()
let openInfoTimes: number = 0
let openLiveTimes: number = 0
let myid: string | null = null
let ifIndex: boolean = true
let ifConnectedAim: boolean = false
let lastAimId: string | null = null
let nodesMap: any[] = []
let rooms = ref<any[]>([])
let liveHostIds: string[] = []
let conns: DataConnection[] = []
let connIds: string[] = []
let layers: number[] = [0]
let roomPosition: number | null = null
let lastLayerNumber: number | null = null
const MyName: string | null = null
let rootId = ''
let switchDeg: number = 180
let connectHistroy: string[] = []
let defaultId: string = 'P2P-Live-Web-default-Id'
let peer: Peer = new Peer()
let guests = new Array()
let guest: any = null
let root: any = null
const roomSort = ref<HTMLSelectElement>()
const roomsDiv = ref<HTMLDivElement>()
const peerId = ref<HTMLInputElement>()
const directConnectId = ref<HTMLInputElement>()
const ifPravite = ref<HTMLInputElement>()
const roomType = ref<HTMLSelectElement>()
const liveTitle = ref<HTMLInputElement>()
const LiveSummary = ref<HTMLTextAreaElement>()
const liveCoverURL = ref<HTMLInputElement>()
const block0 = ref<HTMLDivElement>()
const block1 = ref<HTMLDivElement>()
const roomCover = ref<HTMLImageElement>()
const roomTitle = ref<HTMLDivElement>()
const roomSummary = ref<HTMLDivElement>()
const status = ref<HTMLDivElement>()
const openRoomInfoDiv = ref<HTMLDivElement>()
const roomFor = ref<HTMLDivElement>()

const filteredRooms = computed(() => {
  if (!roomSort.value || roomSort.value.selectedIndex === 0) {
    return rooms.value // 不进行筛选，返回所有房间
  }
  return rooms.value!.filter((room) => room[3] === roomSort.value!.selectedIndex - 1)
})
function displayRoomInfo(aimPosition: number) {
  roomPosition = aimPosition
  nodesMap = rooms.value![aimPosition]
  if (openInfoTimes === 0) {
    openRoomInfo()
  }
}

function autoJoin(t: number) {
  if (nodesMap[1] !== 1 || ifConnectedAim) {
    console.log("Error: try autoJoin() by the nodesMap which wasn't from Root of Room" + nodesMap)
    return
  }
  if (nodesMap[9][3] < t) {
    // host node has low child nodes
    tryConnectGuest(nodesMap[7], true, false)
  } else {
    recursiveSearch(nodesMap[9], t) // search for the node with low child nodes
  }
}

function recursiveSearch(arr: Array<any>, t: number) {
  shallowSearch(arr, t)
  while (temporaryChosedNodes[0] !== undefined) {
    deeplySearch(temporaryChosedNodes, t)
  }
}

function shallowSearch(arr: Array<any>, t: number) {
  for (let i = 7; i < arr.length; i = i + 3) {
    if (arr[i] && arr[i + 2] instanceof Array) {
      if (arr[i + 2][2] < t) {
        if (ifConnectedAim) {
          break
        }
        // console.log("tried connect to: "+ arr[i]);  // DEBUG
        tryConnectGuest(arr[i], true, false)
      } else {
        temporaryChosedNodes.push(arr[i + 2]) // record inapporpriate nodes for deep search
      }
    }
  } // else { console.log("give up connecting to "+ arr[i]); }
}

function deeplySearch(arr: Array<any>, t: number) {
  let counter = arr.length
  lastTemporaryChosedNodes = arr
  temporaryChosedNodes = new Array()
  for (let w = 0; w < counter; w = w + 1) {
    shallowSearch(lastTemporaryChosedNodes[w], t)
  }
}

function openRoomInfo() {
  if (openInfoTimes === 0) {
    openInfoTimes++
    openRoomInfoDiv.value!.style.height = '25%'
    indexRefreshMap(1)
  } else {
    openInfoTimes = 0
    openRoomInfoDiv.value!.style.height = '0px'
  }
}

function tryConnect(id: string, ifJump: boolean) {
  if (root) {
    root.close()
  }

  root = peer!.connect(id)

  root.on('open', () => {
    peerId.value!.value = id
    status.value!.innerHTML = 'Status: Connected to Root Node Successfully!'
  })

  // Receive the reply of text: Host --> Guset
  root.on('data', (data: any) => {
    // Info of rooms from root received
    console.log(data)
    rooms.value = data
    appearRooms()
    console.log('Room list received')
  })

  root.on('close', () => {
    // root = null;
    status.value!.innerHTML = 'Status: Root Connection Closed!'

    // if(document.getElementById("ifAutoReconnect").checked){
    //     document.getElementById("status").innerHTML="Status: Reconnecting to last Root Node...";

    //     tryConnect(4, connectHistroy.slice(-1)[0], false);
    //     // document.getElementById("status").innerHTML="Status: Root Reconnection Failed!";
    // }
  })
}

function tryConnectGuest(id: string, ifJump: boolean, ifAskForMediaStream: boolean) {
  if (guest) {
    if (guest.open) {
      guest.close()
    }
  }
  guest = peer!.connect(id)

  if (ifJump) {
    guest.on('open', () => {
      for (let i = 0; i < guests.length; i++) {
        guest = guests[i]
        guests = new Array() // break all of conn
        ifConnectedAim = true // break search node
        switch (
        nodesMap[3] // room type
        ) {
          case 0:
            document.location.href =
              './P2PLiveAudience.html?id=' + guest.peer + '&name=' + getMyName()
            break
          case 1:
            document.location.href =
              './P2PGameFiveOnLinePlayer.html?id=' + guest.peer + '&name=' + getMyName()
            break
          default:
            console.log('unknown type of room: ' + nodesMap[3])
            break
        }
        // console.log("aim id of node: "+ guest.peer)  // DEBUG
        break
      }
    })
    if (!ifConnectedAim) {
      guests.push(guest)
    }
  } else {
    guest.on('data', (data: any) => {
      for (let i = 0; i < guests.length; i++) {
        if (guests[i].open) {
          // maybe useless
          guest = guests[i]
          guests = new Array() // break all of conn
          nodesMap = data
          ifConnectedAim = true
          guest.on('data', () => {
            ifConnectedAim = false
          })
          break
        }
      }
    })
    if (!ifConnectedAim) {
      guests.push(guest)
    }
  }
}
function getMyName() {
  if (MyName) {
    if (MyName) {
      return MyName
    } else {
      return peer!.id
    }
  }
}

function echoNodesMap(arr: any, layerNumber: any, aimId: any, fnOfEcho: any) {
  if (arr == nodesMap[9]) {
    // refresh Map for "refresh" & hostNode button
    layers = [0]
    if (aimId === undefined) {
      // hostNode button provide the channel connecting to host
      lastAimId = null
    }
    lastLayerNumber = null
    block0.value!.innerHTML = ''
    block1.value!.innerHTML = ''
  }
  if (lastAimId === aimId) {
    // if second click on same button
    switch (fnOfEcho) {
      case 0: // button for getting id
        if (aimId) {
          alert(aimId)
        }
        break
      case 1: // button for joining a node
        if (aimId == peer!.id) {
          alert(aimId)
          break
        }
        document.location.href = './P2PLiveAudience.html?id=' + aimId + '&name=' + getMyName()
        break
      case 2: // button for joining a node
        if (aimId == peer!.id) {
          alert(aimId)
          break
        }
        document.location.href =
          './P2PGameFiveOnLinePlayer.html?id=' + aimId + '&name=' + getMyName()
        break
    }
  } else {
    document.getElementById('block' + (layerNumber % 2))!.innerHTML = ''
    if (lastLayerNumber === layerNumber) {
      layers.splice(lastLayerNumber! + 1) // remove all of old layers
    }
    if (arr) {
      for (let i = 7; i < arr.length; i = i + 3) {
        if (arr[i + 2] instanceof Array) {
          // create buttons linking to child nodes of object which was delivered by clicked button
          document.getElementById('block' + (layerNumber % 2))!.innerHTML =
            document.getElementById('block' + (layerNumber % 2))!.innerHTML +
            '<button class="childNodes" onclick="echoNodesMap(layers[' +
            (layerNumber + 1) +
            '][' +
            (i + 2) +
            '], ' +
            (layerNumber + 1) +
            ', layers[' +
            (layerNumber + 1) +
            '][' +
            i +
            '], ' +
            fnOfEcho +
            ' )">' +
            arr[i + 1] +
            '</button><br />'
        }
      }
    }
    layers.push(arr)
    lastLayerNumber = layerNumber
    lastAimId = aimId // original id of this layer
  }
}

function refreshMap(fnOfEcho: any) {
  roomTitle.value!.innerHTML = nodesMap[4]
  roomSummary.value = nodesMap[5]
  roomCover.value!.src = nodesMap[6]
  echoNodesMap(nodesMap[9], 0, undefined, fnOfEcho) // refresh the menu
}

function indexRefreshMap(fnOfEcho: number) {
  nodesMap = rooms.value![roomPosition!]
  refreshMap(fnOfEcho)
}

function appearRooms() {
  console.log('Rooms list updated')
  roomsDiv.value!.innerHTML = ''
  console.log(rooms)
  // for (let i = 0; i < rooms.length; i++) {
  //   if (roomSort.value) {
  //     if (rooms[i][3] !== roomSort.value.selectedIndex - 1) {
  //       continue
  //     }
  //   }

  //   let room = document.createElement('div')
  //   room.classList.add('rooms')
  //   room.setAttribute('onclick', 'displayRoomInfo(' + i + ')')
  //   room.appendChild(document.createTextNode(rooms[i][4]))
  //   room.setAttribute(
  //     'style',
  //     "background-image: url('" + rooms[i][6] + "'); background-size: contain;"
  //   )

  //   let roomNumbers = document.createElement('span')
  //   roomNumbers.appendChild(document.createTextNode('Members:' + rooms[i][2].length))
  //   roomNumbers.setAttribute('style', 'position: absolute; bottom: 0;')
  //   room.appendChild(roomNumbers)

  //   document.getElementById('rooms')!.appendChild(room)
  // }
}
function rootSend(rooms: any[]) {
  console.log('deliver rooms update') // DEBUG
  for (let i = 0; i < conns.length; i++) {
    if (liveHostIds.includes(connIds[i])) {
      continue
    }
    if (conns[i].open) {
      conns[i].send(rooms)
    }
  }
  appearRooms()
}

onMounted(() => {
  peer = new Peer(defaultId, { debug: 2 })
  // Listen for the event when a Peer connection is successfully opened
  peer.on('open', (id: string) => {
    console.log(id)
    document.getElementById('myid')!.innerHTML = 'Your ID:<br/>' + id
    document.getElementById('status')!.innerHTML = 'Status: Root Node Created'
  })
  peer.on('error', (err: any) => {
    if (err.type === 'unavailable-id') {
      document.getElementById('connectRoot')!.style.visibility = 'visible'
      peer = new Peer({ debug: 2 })
      peer.on('open', (id: string) => {
        console.log(id)
        document.getElementById('myid')!.innerHTML = 'Your ID:<br/>' + id
        document.getElementById('status')!.innerHTML = 'Status: Need to connect to the Root Node'
        defaultConnect()
      })
    } else {
      alert('initial work ERROR(check in console)')
    }
  })

  if (peer.id === defaultId) {
    peer.on('connection', (connPort: DataConnection) => {
      const conn: DataConnection = connPort

      conn.on('open', () => {
        connIds.push(conn.peer)
        conns.push(conn)
        console.log('Be connected to: ' + conn.peer)
        conn.send(rooms)
      })

      conn.on('close', () => {
        for (let i = 0; i < conns.length; i++) {
          if (conns[i]) {
            if (conns[i].open) {
              continue
            } else {
              let disconnectedHost = connIds.indexOf(conns[i].peer)
              let disconnectedLiveHost = liveHostIds.indexOf(conns[i].peer)
              if (disconnectedHost !== -1) {
                console.log('Disconnected and deleted: ' + conns[i].peer) // DEBUG
                conns.splice(disconnectedHost, 1)
                connIds.splice(disconnectedHost, 1)
              }
              if (disconnectedLiveHost !== -1) {
                liveHostIds.splice(disconnectedLiveHost, 1)
                rooms.value!.splice(disconnectedLiveHost, 1)
                rootSend(rooms.value!)
              }
            }
          } else {
            break
          }
        }
      })

      conn.on('data', (data: any) => {
        switch (data[0]) {
          case 0:
            break
          case 1:
            if (liveHostIds.includes(data[7])) {
              rooms.value![liveHostIds.indexOf(data[7])] = data
            } else {
              liveHostIds.push(data[7])
              rooms.value!.push(data) // record child nodesMap
            }
            console.log('Live rooms update') // DEBUG
            rootSend(rooms.value!)
            break
          default:
            console.log('unknown data: ' + data)
        }
      })
    })
  }
})

// 修改 为vue3 的绑定事件
function buttonConnect() {
  if (peer!.id === defaultId) {
    alert("Root node can't connect others")
    return
  }
  document.getElementById('status')!.innerHTML = 'Status: Connecting to Root Node...'

  if (peerId.value) {
    if (connectHistroy.slice(-1)[0] !== peerId.value.value) {
      connectHistroy.push(peerId.value.value)
    }
    tryConnect(connectHistroy.slice(-1)[0], false)
  } else {
    defaultConnect()
  }
}
function buttonDirectConnect() {
  if (guest) {
    if (guest.open) {
      guest.close()
    }
  }
  guest = peer!.connect(directConnectId.value!.value)
  guest.on('open', () => {
    console.log('successfully connected: ' + guest.peer) // DEBUG
  })
  guest.on('data', (data: any) => {
    nodesMap = data
    switch (nodesMap[3]) {
      case 0:
        document.location.href = './P2PLiveAudience.html?id=' + guest.peer + '&name=' + getMyName()
        break
      case 1:
        document.location.href =
          './P2PGameFiveOnLinePlayer.html?id=' + guest.peer + '&name=' + getMyName()
        break
      default:
        console.log('unknown type of room: ' + nodesMap[3])
        break
    }
  })
}
function buttonCreateRoom() {
  if (!ifPravite.value!.checked) {
    if (peer!.id === defaultId) {
      rootId = defaultId
    } else if (root) {
      if (root.open) {
        rootId = root.peer
      } else {
        alert('Please join a Root Node at first!')
        return
      }
    } else {
      alert('Please join a Root Node at first!')
      return
    }
  }
  switch (roomType.value!.selectedIndex) {
    case 0:
      window.open(
        './P2PLiveHost.html?rootId=' +
        rootId +
        '&title=' +
        liveTitle.value!.value +
        '&summary=' +
        LiveSummary.value!.value +
        '&coverURL=' +
        liveCoverURL.value!.value,
        '_blank'
      )
      break
    case 1:
      alert('Find files of P2P Game FiveOnline in Github')
      break
    case 2:
      alert('undone')
      break
    default:
      console.log('Error type of room')
      break
  }
}
// 修改 为vue3 的绑定事件
function echoHistoricalConnectedId() {
  console.log(connectHistroy)
}

function showLive() {
  if (openLiveTimes === 0) {
    openLiveTimes++
    document.getElementById('liveSetting')!.style.height = '25%'
  } else {
    openLiveTimes = 0
    document.getElementById('liveSetting')!.style.height = '0px'
  }
}
function defaultConnect() {
  if (peer!.id === defaultId) {
    alert("Root node can't connect others")
    return
  }
  if (root) {
    root.close()
  }
  tryConnect(defaultId, false)
}
</script>

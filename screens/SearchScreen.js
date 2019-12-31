import React from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  View,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
/*
* TODO: Add entrance cost query, rarity query, card set query
*/
import AuthService from '../auth/AuthService';
// Symbols
import fire from '../assets/images/symbol/fireSymbol.png';
import earth from '../assets/images/symbol/earthSymbol.png';
import wind from '../assets/images/symbol/windSymbol.png';
import water from '../assets/images/symbol/waterSymbol.png';
import lightning from '../assets/images/symbol/lightningSymbol.png';
import void_ from '../assets/images/symbol/voidSymbol.png';

// Types
import ninja from '../assets/images/type/ninjaType.png';
import mission from '../assets/images/type/missionType.png';
import jutsu from '../assets/images/type/jutsuType.png';
import client from '../assets/images/type/clientType.png';

// Entrance Costs
import zero from '../assets/images/entrance/zero.png';
import one from '../assets/images/entrance/one.png';
import two from '../assets/images/entrance/two.png';
import three from '../assets/images/entrance/three.png';
import four from '../assets/images/entrance/four.png';
import five from '../assets/images/entrance/five.png';
import six from '../assets/images/entrance/six.png';
import seven from '../assets/images/entrance/seven.png';
import eight from '../assets/images/entrance/eight.png';
import nine from '../assets/images/entrance/nine.png';

// Combat Attributes
import question_ from '../assets/images/combat/_CA.png';
import absorption from '../assets/images/combat/absorptionCA.png';
import bee from '../assets/images/combat/beeCA.png';
import bomb from '../assets/images/combat/bombCA.png';
import bone from '../assets/images/combat/boneCA.png';
import brush from '../assets/images/combat/brushCA.png';
import bubble from '../assets/images/combat/bubbleCA.png';
import control from '../assets/images/combat/controlCA.png';
import cooking from '../assets/images/combat/cookingCA.png';
import crystal from '../assets/images/combat/crystalCA.png';
import curse from '../assets/images/combat/curseCA.png';
import decode from '../assets/images/combat/decodeCA.png';
import delivery from '../assets/images/combat/deliveryCA.png';
import face from '../assets/images/combat/faceCA.png';
import fang from '../assets/images/combat/fangCA.png';
import flame from '../assets/images/combat/flameCA.png';
import food from '../assets/images/combat/foodCA.png';
import fool from '../assets/images/combat/foolCA.png';
import genjutsu from '../assets/images/combat/genjutsuCA.png';
import gravity from '../assets/images/combat/gravityCA.png';
import hair from '../assets/images/combat/hairCA.png';
import ice from '../assets/images/combat/iceCA.png';
import ink from '../assets/images/combat/inkCA.png';
import insect from '../assets/images/combat/insectCA.png';
import lava from '../assets/images/combat/lavaCA.png';
import magic from '../assets/images/combat/magicCA.png';
import magnet from '../assets/images/combat/magnetCA.png';
import manipulation from '../assets/images/combat/manipulationCA.png';
import medicine from '../assets/images/combat/medicineCA.png';
import mind from '../assets/images/combat/mindCA.png';
import money from '../assets/images/combat/moneyCA.png';
import mud from '../assets/images/combat/mudCA.png';
import nail from '../assets/images/combat/nailCA.png';
import ninjutsu from '../assets/images/combat/ninjutsuCA.png';
import oil from '../assets/images/combat/oilCA.png';
import paper from '../assets/images/combat/paperCA.png';
import peacock from '../assets/images/combat/peacockCA.png';
import pig from '../assets/images/combat/pigCA.png';
import power from '../assets/images/combat/powerCA.png';
import prophecy from '../assets/images/combat/prophecyCA.png';
import running from '../assets/images/combat/runningCA.png';
import sand from '../assets/images/combat/sandCA.png';
import sandiron from '../assets/images/combat/sandironCA.png';
import seal from '../assets/images/combat/sealCA.png';
import shadow from '../assets/images/combat/shadowCA.png';
import slime from '../assets/images/combat/slimeCA.png';
import smoke from '../assets/images/combat/smokeCA.png';
import snake from '../assets/images/combat/snakeCA.png';
import soft from '../assets/images/combat/softCA.png';
import sound from '../assets/images/combat/soundCA.png';
import speech from '../assets/images/combat/speechCA.png';
import spider from '../assets/images/combat/spiderCA.png';
import spirit from '../assets/images/combat/spiritCA.png';
import steal from '../assets/images/combat/stealCA.png';
import steam from '../assets/images/combat/steamCA.png';
import stitch from '../assets/images/combat/stitchCA.png';
import stone from '../assets/images/combat/stoneCA.png';
import taijutsu from '../assets/images/combat/taijutsuCA.png';
import thunderbolt from '../assets/images/combat/thunderboltCA.png';
import tree from '../assets/images/combat/treeCA.png';
import water_CA from '../assets/images/combat/waterCA.png';
import weapon from '../assets/images/combat/weaponCA.png';
import wisdom from '../assets/images/combat/wisdomCA.png';

// Set lists
import set1 from '../assets/images/sets/01PathToHokage.png';
import set2 from '../assets/images/sets/02CoilsOfTheSnake.png';
import set3 from '../assets/images/sets/03CurseOfTheSand.png';
import set4 from '../assets/images/sets/04RevengeAndRebirth.png';
import set5 from '../assets/images/sets/05DreamLegacy.png';
import set6 from '../assets/images/sets/06EternalRivalry.png';
import set7 from '../assets/images/sets/07QuestForPower.png';
import set8 from '../assets/images/sets/08BattleofDestiny.png';
import set9 from '../assets/images/sets/09TheChosen.png';
import set10 from '../assets/images/sets/10LineageoftheLegends.png';
import set11 from '../assets/images/sets/11ApproachingWind.png';
import set12 from '../assets/images/sets/12ANewChronicle.png';
import set13 from '../assets/images/sets/13FatefulReunion.png';
import set14 from '../assets/images/sets/14EmergingAlliance.png';
import set15 from '../assets/images/sets/15ForetoldProphecy.png';
import set16 from '../assets/images/sets/16BrokenPromise.png';
import set17 from '../assets/images/sets/17WillofFire.png';
import set18 from '../assets/images/sets/18TP1.png';
import set19 from '../assets/images/sets/19FangsoftheSnake.png';
import set20 from '../assets/images/sets/20PathofPain.png';
import set21 from '../assets/images/sets/21TP2.png';
import set22 from '../assets/images/sets/22Talesofthegallantsage.png';
import set23 from '../assets/images/sets/23ShatteredTruths.png';
import set24 from '../assets/images/sets/24TP3.png';
import set25 from '../assets/images/sets/25WeaponsofWar.png';
import set26 from '../assets/images/sets/26Invasion.png';
import set27 from '../assets/images/sets/27TP4.png';
import set28 from '../assets/images/sets/28SageLegacy.png';
import set29 from '../assets/images/sets/29KageSummit.png';
import set30 from '../assets/images/sets/30AvengerWrath.png';
import set31 from '../assets/images/sets/31HeroAscension.png';
import set32 from '../assets/images/sets/32UltimateNinjaStorm3.png';
import set33 from '../assets/images/sets/33ShinobisDream.png';

const Auth = new AuthService();

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };
  constructor(props) {
    super(props);
    this.state = {
      query: 'Search by Card Name (Sasuke Uchiha)',
      characteristic: 'Search by Characteristics (Female,Platoon)',
      cardEffect: 'Search by Card Effect',
      // Symbol State
      fireSymbol: 1,
      waterSymbol: 1,
      earthSymbol: 1,
      windSymbol: 1,
      lightningSymbol: 1,
      voidSymbol: 1,
      // Type State
      ninjaType: 1,
      missionType: 1,
      jutsuType: 1,
      clientType: 1,
      // Entrance Cost
      zeroEC: 1,
      oneEC: 1,
      twoEC: 1,
      threeEC: 1,
      fourEC: 1,
      fiveEC: 1,
      sixEC: 1,
      sevenEC: 1,
      eightEC: 1,
      nineEC: 1,
      // Cobat Attr State
      questionCA: 1,
      absorptionCA: 1,
      beeCA: 1,
      bombCA: 1,
      boneCA: 1,
      brushCA: 1,
      bubbleCA: 1,
      controlCA: 1,
      cookingCA: 1,
      crystalCA: 1,
      curseCA: 1,
      decodeCA: 1,
      deliveryCA: 1,
      faceCA: 1,
      fangCA: 1,
      flameCA: 1,
      foodCA: 1,
      foolCA: 1,
      genjutsuCA: 1,
      gravityCA: 1,
      hairCA: 1,
      iceCA: 1,
      inkCA: 1,
      insectCA: 1,
      lavaCA: 1,
      magicCA: 1,
      magnetCA: 1,
      manipulationCA: 1,
      medicineCA: 1,
      mindCA: 1,
      moneyCA: 1,
      mudCA: 1,
      nailCA: 1,
      ninjutsuCA: 1,
      oilCA: 1,
      paperCA: 1,
      peacockCA: 1,
      pigCA: 1,
      powerCA: 1,
      prophecyCA: 1,
      runningCA: 1,
      sandCA: 1,
      sandironCA: 1,
      sealCA: 1,
      shadowCA: 1,
      slimeCA: 1,
      smokeCA: 1,
      snakeCA: 1,
      softCA: 1,
      soundCA: 1,
      speechCA: 1,
      spiderCA: 1,
      spiritCA: 1,
      stealCA: 1,
      steamCA: 1,
      stitchCA: 1,
      stoneCA: 1,
      taijutsuCA: 1,
      thunderboltCA: 1,
      treeCA: 1,
      waterCA: 1,
      weaponCA: 1,
      wisdomCA: 1,
      // Set lists
      set1Shadow: 1,
      set2Shadow: 1,
      set3Shadow: 1,
      set4Shadow: 1,
      set5Shadow: 1,
      set6Shadow: 1,
      set7Shadow: 1,
      set8Shadow: 1,
      set9Shadow: 1,
      set10Shadow: 1,
      set11Shadow: 1,
      set12Shadow: 1,
      set13Shadow: 1,
      set14Shadow: 1,
      set15Shadow: 1,
      set16Shadow: 1,
      set17Shadow: 1,
      set18Shadow: 1,
      set19Shadow: 1,
      set20Shadow: 1,
      set21Shadow: 1,
      set22Shadow: 1,
      set23Shadow: 1,
      set24Shadow: 1,
      set25Shadow: 1,
      set26Shadow: 1,
      set27Shadow: 1,
      set28Shadow: 1,
      set29Shadow: 1,
      set30Shadow: 1,
      set31Shadow: 1,
      set32Shadow: 1,
      set33Shadow: 1,
      symbolChoice: '',
      typeChoice: '',
      combatChoice: '',
      entranceCostChoice: '',
      searchType: '',
      setChoice: '',
      deckId: '',
      chatId: '',
    };
    this.search = this.search.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }
  componentDidMount() {
    const { navigation } = this.props;
    const search_type = navigation.getParam('searchType');
    const deck_id = navigation.getParam('deckId');
    const chat_id = navigation.getParam('chat_id');
    this.setState({
      searchType: search_type, 
      deckId: deck_id, 
      chatId: chat_id
    });
  }
  search() {
    let name = this.state.query;
    name = name.trim();
    let symbol = this.state.symbolChoice;
    let type = this.state.typeChoice;
    let combatAttr = this.state.combatChoice;
    let entrance = this.state.entranceCostChoice;
    let setList = this.state.setChoice;
    let cardChar = this.state.characteristic;
    cardChar = cardChar.trim();
    let printedEffect = this.state.cardEffect;
    printedEffect = printedEffect.trim();
    let endpoint = 'https://api.narutoccg.com/api/v1/posts?'

    if (name !== 'Search by Card Name (Sasuke Uchiha)' || '') {
      // not just filters but actually searched a card
      endpoint += `search=${name}&`
    }  
    if (cardChar !== 'Search by Characteristics (Female,Platoon)' || ''){
      endpoint += `characteristic=${cardChar}&`
    }
    if (printedEffect !== 'Search by Card Effect' || '') {
      endpoint += `cardEffect=${printedEffect}&`
    }
    if (symbol !== '') {
      endpoint += `symbol=${symbol}&`
    }
    if (type !== '') {
      endpoint += `type=${type}&`
    }
    if (entrance !== '') {
      endpoint += `entranceCost=${entrance}&`
    }
    if (combatAttr !== '') {
      endpoint += `combatAttr=${combatAttr}&`
    }
    if (setList !== '') {
      endpoint += `cardSet=${setList}&`
    }
    Auth.fetch(endpoint, {
      mode: 'cors',
      method: 'GET'
    }).then(res => {
      let posts = res.posts // array
      this.props.navigation.navigate('SearchResults', {
        cards: posts,
        result: res.result,
        searchType: this.state.searchType,
        deckId: this.state.deckId,
        chatId: this.state.chatId
      });
    })
      .catch(err => {
        console.log(err);
      })
  }
  resetFilters() {
    this.setState({
      query: 'Search by Card Name (Sasuke Uchiha)',
      characteristic: 'Search by Characteristics (Female,Platoon)',
      cardEffect: 'Search by Card Effect',
      // Symbol State
      fireSymbol: 1,
      waterSymbol: 1,
      earthSymbol: 1,
      windSymbol: 1,
      lightningSymbol: 1,
      voidSymbol: 1,
      // Type State
      ninjaType: 1,
      missionType: 1,
      jutsuType: 1,
      clientType: 1,
      // Entrance Cost
      zeroEC: 1,
      oneEC: 1,
      twoEC: 1,
      threeEC: 1,
      fourEC: 1,
      fiveEC: 1,
      sixEC: 1,
      sevenEC: 1,
      eightEC: 1,
      nineEC: 1,
      // Cobat Attr State
      questionCA: 1,
      absorptionCA: 1,
      beeCA: 1,
      bombCA: 1,
      boneCA: 1,
      brushCA: 1,
      bubbleCA: 1,
      controlCA: 1,
      cookingCA: 1,
      crystalCA: 1,
      curseCA: 1,
      decodeCA: 1,
      deliveryCA: 1,
      faceCA: 1,
      fangCA: 1,
      flameCA: 1,
      foodCA: 1,
      foolCA: 1,
      genjutsuCA: 1,
      gravityCA: 1,
      hairCA: 1,
      iceCA: 1,
      inkCA: 1,
      insectCA: 1,
      lavaCA: 1,
      magicCA: 1,
      magnetCA: 1,
      manipulationCA: 1,
      medicineCA: 1,
      mindCA: 1,
      moneyCA: 1,
      mudCA: 1,
      nailCA: 1,
      ninjutsuCA: 1,
      oilCA: 1,
      paperCA: 1,
      peacockCA: 1,
      pigCA: 1,
      powerCA: 1,
      prophecyCA: 1,
      runningCA: 1,
      sandCA: 1,
      sandironCA: 1,
      sealCA: 1,
      shadowCA: 1,
      slimeCA: 1,
      smokeCA: 1,
      snakeCA: 1,
      softCA: 1,
      soundCA: 1,
      speechCA: 1,
      spiderCA: 1,
      spiritCA: 1,
      stealCA: 1,
      steamCA: 1,
      stitchCA: 1,
      stoneCA: 1,
      taijutsuCA: 1,
      thunderboltCA: 1,
      treeCA: 1,
      waterCA: 1,
      weaponCA: 1,
      wisdomCA: 1,
      // Sets
      set1Shadow: 1,
      set2Shadow: 1,
      set3Shadow: 1,
      set4Shadow: 1,
      set5Shadow: 1,
      set6Shadow: 1,
      set7Shadow: 1,
      set8Shadow: 1,
      set9Shadow: 1,
      set10Shadow: 1,
      set11Shadow: 1,
      set12Shadow: 1,
      set13Shadow: 1,
      set14Shadow: 1,
      set15Shadow: 1,
      set16Shadow: 1,
      set17Shadow: 1,
      set18Shadow: 1,
      set19Shadow: 1,
      set20Shadow: 1,
      set21Shadow: 1,
      set22Shadow: 1,
      set23Shadow: 1,
      set24Shadow: 1,
      set25Shadow: 1,
      set26Shadow: 1,
      set27Shadow: 1,
      set28Shadow: 1,
      set29Shadow: 1,
      set30Shadow: 1,
      set31Shadow: 1,
      set32Shadow: 1,
      set33Shadow: 1,
      symbolChoice: '',
      typeChoice: '',
      combatChoice: '',
      entranceCostChoice: '',
      setChoice: '',
    })
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <NavigationEvents
        onWillFocus={() => this.resetFilters()}
        onDidBlur={() => this.resetFilters()}
        />
        <ScrollView contentContainerStyle={styles.container}>
          {/* Search Input */}
          <View style={styles.searchInputContainer}>
            <TextInput
            style={styles.searchInput}
            onChangeText={(query) => this.setState({query})}
            value={this.state.query}
            returnKeyType="done"
            onFocus={() => this.setState({query: ''})}
            ></TextInput>
            <TouchableOpacity onPress={() => this.search()}>
              <Text style={styles.searchButton}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchInputContainer}>
            <TextInput
            style={styles.searchInputAlt}
            onChangeText={(characteristic) => this.setState({characteristic})}
            value={this.state.characteristic}
            returnKeyType="done"
            onFocus={() => this.setState({characteristic: ''})}
            ></TextInput>
          </View>
          <View style={styles.searchInputContainer}>
            <TextInput
            style={styles.searchInputAlt}
            onChangeText={(cardEffect) => this.setState({cardEffect})}
            value={this.state.cardEffect}
            returnKeyType="done"
            onFocus={() => this.setState({cardEffect: ''})}
            ></TextInput>
          </View>
          <View style={styles.exclusiveSetListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 1,
              setChoice: "A Shinobi's Dream",    
              })} style={styles.exclusiveSetList}>
              <Image
              source={set33}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'cover',    
                opacity: this.state.set33Shadow,
                }}
              />
              <Text style={styles.exclusiveSetName}>A Shinobi's Dream</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.filterHead}>Symbol</Text>
          </View>
          <View style={styles.symbolFilter}>
            <TouchableOpacity onPress={() => this.setState({
              fireSymbol: 1, 
              waterSymbol: 0.5, 
              earthSymbol: 0.5, 
              windSymbol: 0.5, 
              lightningSymbol: 0.5, 
              voidSymbol: 0.5,
              symbolChoice: 'fire'
              })} style={styles.touchSymbol}>
              <Image
              source={fire}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.fireSymbol,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              fireSymbol: 0.5, 
              waterSymbol: 1, 
              earthSymbol: 0.5, 
              windSymbol: 0.5, 
              lightningSymbol: 0.5, 
              voidSymbol: 0.5,
              symbolChoice: 'water'
              })} style={styles.touchSymbol}>
              <Image
              source={water}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.waterSymbol
              }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              fireSymbol: 0.5, 
              waterSymbol: 0.5, 
              earthSymbol: 1, 
              windSymbol: 0.5, 
              lightningSymbol: 0.5, 
              voidSymbol: 0.5,
              symbolChoice: 'earth'
              })} style={styles.touchSymbol}>
              <Image
              source={earth}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.earthSymbol,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              fireSymbol: 0.5, 
              waterSymbol: 0.5, 
              earthSymbol: 0.5, 
              windSymbol: 1, 
              lightningSymbol: 0.5, 
              voidSymbol: 0.5,
              symbolChoice: 'wind'
              })} style={styles.touchSymbol}>
              <Image
              source={wind}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.windSymbol,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              fireSymbol: 0.5, 
              waterSymbol: 0.5, 
              earthSymbol: 0.5, 
              windSymbol: 0.5, 
              lightningSymbol: 1, 
              voidSymbol: 0.5,
              symbolChoice: 'lightning'
              })} style={styles.touchSymbol}>
              <Image
              source={lightning}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.lightningSymbol,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              fireSymbol: 0.5, 
              waterSymbol: 0.5, 
              earthSymbol: 0.5, 
              windSymbol: 0.5, 
              lightningSymbol: 0.5, 
              voidSymbol: 1,
              symbolChoice: 'void'
              })} style={{ flex: 1/6}}>
              <Image
              source={void_}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.voidSymbol,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.filterHead}>Type</Text>
          </View>
          <View style={styles.typeContainer}>
            <TouchableOpacity onPress={() => this.setState({
              ninjaType: 1, 
              missionType: 0.5, 
              jutsuType: 0.5, 
              clientType: 0.5,
              typeChoice: 'ninja'
              })} style={styles.touchType}>
              <Image
              source={ninja}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.ninjaType,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              ninjaType: 0.5, 
              missionType: 1, 
              jutsuType: 0.5, 
              clientType: 0.5,
              typeChoice: 'mission'
              })} style={styles.touchType}>
              <Image
              source={mission}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.missionType,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              ninjaType: 0.5, 
              missionType: 0.5, 
              jutsuType: 1, 
              clientType: 0.5,
              typeChoice: 'jutsu'
              })} style={styles.touchType}>
              <Image
              source={jutsu}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.jutsuType,
                }}
              />
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => this.setState({
              ninjaType: 0.5, 
              missionType: 0.5, 
              jutsuType: 0.5, 
              clientType: 1,
              typeChoice: 'client'
              })} style={{ flex: 1/4 }}>
              <Image
              source={client}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.clientType,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.filterHead}>Entrance Cost</Text>
          </View>
          <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 1,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '0',
              })} style={styles.touchCombat}>
              <Image
              source={zero}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.zeroEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 1,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '1',
              })} style={styles.touchCombat}>
              <Image
              source={one}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.oneEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 1,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '2',
              })} style={styles.touchCombat}>
              <Image
              source={two}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.twoEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 1,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '3',
              })} style={styles.touchCombat}>
              <Image
              source={three}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.threeEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 1,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '4',
              })} style={styles.touchCombat}>
              <Image
              source={four}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.fourEC,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 1,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '5',
              })} style={styles.touchCombat}>
              <Image
              source={five}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.fiveEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 1,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '6',
              })} style={styles.touchCombat}>
              <Image
              source={six}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.sixEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 1,
              eightEC: 0.5,
              nineEC: 0.5,
              entranceCostChoice: '7',
              })} style={styles.touchCombat}>
              <Image
              source={seven}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.sevenEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 1,
              nineEC: 0.5,
              entranceCostChoice: '8',
              })} style={styles.touchCombat}>
              <Image
              source={eight}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.eightEC,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              zeroEC: 0.5,
              oneEC: 0.5,
              twoEC: 0.5,
              threeEC: 0.5,
              fourEC: 0.5,
              fiveEC: 0.5,
              sixEC: 0.5,
              sevenEC: 0.5,
              eightEC: 0.5,
              nineEC: 1,
              entranceCostChoice: '9',
              })} style={styles.touchCombat}>
              <Image
              source={nine}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.nineEC,
                }}
              />
            </TouchableOpacity>
          </View>
          {
            this.state.typeChoice == 'ninja' ?
            <View>
              <Text style={styles.filterHead}>Combat Attribute</Text>
            </View>
            :
            <View></View>
          }
          {/*  */}
          {/* Starting Combat Attributes */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 1,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: '?'
              })} style={styles.touchCombat}>
              <Image
              source={question_}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.questionCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 1,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'absorption'
              })} style={styles.touchCombat}>
              <Image
              source={absorption}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.absorptionCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 1,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'bee'
              })} style={styles.touchCombat}>
              <Image
              source={bee}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.beeCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 1,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'bomb'
              })} style={styles.touchCombat}>
              <Image
              source={bomb}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.bombCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 1,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'bone'
              })} style={styles.touchCombat}>
              <Image
              source={bone}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.boneCA,
                }}
              />
            </TouchableOpacity>
          </View>      
            :
            <View></View>
          }
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 1,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'brush'
              })} style={styles.touchCombat}>
              <Image
              source={brush}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.brushCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 1,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'bubble'
              })} style={styles.touchCombat}>
              <Image
              source={bubble}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.bubbleCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 1,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'control'
              })} style={styles.touchCombat}>
              <Image
              source={control}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.controlCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 1,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'cooking'
              })} style={styles.touchCombat}>
              <Image
              source={cooking}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.cookingCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 1,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'crystal'
              })} style={styles.touchCombat}>
              <Image
              source={crystal}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.crystalCA,
                }}
              />
            </TouchableOpacity>
          </View>    
            :
            <View></View>
          }

          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 1,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'curse'
              })} style={styles.touchCombat}>
              <Image
              source={curse}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.curseCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 1,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'decode'
              })} style={styles.touchCombat}>
              <Image
              source={decode}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.decodeCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 1,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'delivery'
              })} style={styles.touchCombat}>
              <Image
              source={delivery}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.deliveryCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 1,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'face'
              })} style={styles.touchCombat}>
              <Image
              source={face}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.faceCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 1,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'fang'
              })} style={styles.touchCombat}>
              <Image
              source={fang}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.fangCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 1,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'flame'
              })} style={styles.touchCombat}>
              <Image
              source={flame}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.flameCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 1,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'food'
              })} style={styles.touchCombat}>
              <Image
              source={food}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.foodCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 1,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'fool'
              })} style={styles.touchCombat}>
              <Image
              source={fool}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.foolCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 1,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'genjutsu'
              })} style={styles.touchCombat}>
              <Image
              source={genjutsu}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.genjutsuCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 1,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'gravity'
              })} style={styles.touchCombat}>
              <Image
              source={gravity}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.gravityCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 1,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'hair'
              })} style={styles.touchCombat}>
              <Image
              source={hair}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.hairCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 1,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'ice'
              })} style={styles.touchCombat}>
              <Image
              source={ice}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.iceCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 1,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'ink'
              })} style={styles.touchCombat}>
              <Image
              source={ink}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.inkCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 1,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'insect'
              })} style={styles.touchCombat}>
              <Image
              source={insect}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.insectCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 1,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'lava'
              })} style={styles.touchCombat}>
              <Image
              source={lava}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.lavaCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 1,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'magic'
              })} style={styles.touchCombat}>
              <Image
              source={magic}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.magicCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 1,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'magnet'
              })} style={styles.touchCombat}>
              <Image
              source={magnet}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.magnetCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 1,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'manipulation'
              })} style={styles.touchCombat}>
              <Image
              source={manipulation}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.manipulationCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 1,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'medicine'
              })} style={styles.touchCombat}>
              <Image
              source={medicine}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.medicineCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 1,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'mind'
              })} style={styles.touchCombat}>
              <Image
              source={mind}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.mindCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 1,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'money'
              })} style={styles.touchCombat}>
              <Image
              source={money}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.moneyCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 1,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'mud'
              })} style={styles.touchCombat}>
              <Image
              source={mud}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.mudCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 1,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'nail'
              })} style={styles.touchCombat}>
              <Image
              source={nail}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.nailCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 1,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'ninjutsu'
              })} style={styles.touchCombat}>
              <Image
              source={ninjutsu}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.ninjutsuCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 1,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'oil'
              })} style={styles.touchCombat}>
              <Image
              source={oil}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.oilCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 1,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'paper'
              })} style={styles.touchCombat}>
              <Image
              source={paper}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.paperCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 1,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'peacock'
              })} style={styles.touchCombat}>
              <Image
              source={peacock}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.peacockCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 1,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'pig'
              })} style={styles.touchCombat}>
              <Image
              source={pig}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.pigCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 1,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'power'
              })} style={styles.touchCombat}>
              <Image
              source={power}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.powerCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 1,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'prophecy'
              })} style={styles.touchCombat}>
              <Image
              source={prophecy} 
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.prophecyCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 1,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'running'
              })} style={styles.touchCombat}>
              <Image
              source={running}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.runningCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 1,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'sand'
              })} style={styles.touchCombat}>
              <Image
              source={sand}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.sandCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 1,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'sand iron'
              })} style={styles.touchCombat}>
              <Image
              source={sandiron}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.sandironCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 1,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'seal'
              })} style={styles.touchCombat}>
              <Image
              source={seal}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.sealCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 1,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'shadow'
              })} style={styles.touchCombat}>
              <Image
              source={shadow}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.shadowCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 1,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'slime'
              })} style={styles.touchCombat}>
              <Image
              source={slime}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.slimeCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 1,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'smoke'
              })} style={styles.touchCombat}>
              <Image
              source={smoke}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.smokeCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 1,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'snake'
              })} style={styles.touchCombat}>
              <Image
              source={snake}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.snakeCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 1,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'soft'
              })} style={styles.touchCombat}>
              <Image
              source={soft}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.softCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 1,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'sound'
              })} style={styles.touchCombat}>
              <Image
              source={sound}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.soundCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 1,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'speech'
              })} style={styles.touchCombat}>
              <Image
              source={speech}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.speechCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 1,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'spider'
              })} style={styles.touchCombat}>
              <Image
              source={spider}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.spiderCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 1,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'spirit'
              })} style={styles.touchCombat}>
              <Image
              source={spirit}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.spiritCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 1,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'steal'
              })} style={styles.touchCombat}>
              <Image
              source={steal}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.stealCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 1,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'steam'
              })} style={styles.touchCombat}>
              <Image
              source={steam}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.steamCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 1,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'stitch'
              })} style={styles.touchCombat}>
              <Image
              source={stitch}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.stitchCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 1,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'stone'
              })} style={styles.touchCombat}>
              <Image
              source={stone}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.stoneCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 1,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'taijutsu'
              })} style={styles.touchCombat}>
              <Image
              source={taijutsu}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.taijutsuCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 1,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'thunderbolt'
              })} style={styles.touchCombat}>
              <Image
              source={thunderbolt}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.thunderboltCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 1,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'tree'
              })} style={styles.touchCombat}>
              <Image
              source={tree}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.treeCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {
            this.state.typeChoice == 'ninja' ?
            <View style={styles.combatContainer}>
          <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 1,
              weaponCA: 0.5,
              wisdomCA: 0.5,
              combatChoice: 'water'
              })} style={styles.touchCombat}>
              <Image
              source={water_CA}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.waterCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 1,
              wisdomCA: 0.5,
              combatChoice: 'weapon'
              })} style={styles.touchCombat}>
              <Image
              source={weapon}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.weaponCA,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setState({
              questionCA: 0.5,
              absorptionCA: 0.5,
              beeCA: 0.5,
              bombCA: 0.5,
              boneCA: 0.5,
              brushCA: 0.5,
              bubbleCA: 0.5,
              controlCA: 0.5,
              cookingCA: 0.5,
              crystalCA: 0.5,
              curseCA: 0.5,
              decodeCA: 0.5,
              deliveryCA: 0.5,
              faceCA: 0.5,
              fangCA: 0.5,
              flameCA: 0.5,
              foodCA: 0.5,
              foolCA: 0.5,
              genjutsuCA: 0.5,
              gravityCA: 0.5,
              hairCA: 0.5,
              iceCA: 0.5,
              inkCA: 0.5,
              insectCA: 0.5,
              lavaCA: 0.5,
              magicCA: 0.5,
              magnetCA: 0.5,
              manipulationCA: 0.5,
              medicineCA: 0.5,
              mindCA: 0.5,
              moneyCA: 0.5,
              mudCA: 0.5,
              nailCA: 0.5,
              ninjutsuCA: 0.5,
              oilCA: 0.5,
              paperCA: 0.5,
              peacockCA: 0.5,
              pigCA: 0.5,
              powerCA: 0.5,
              prophecyCA: 0.5,
              runningCA: 0.5,
              sandCA: 0.5,
              sandironCA: 0.5,
              sealCA: 0.5,
              shadowCA: 0.5,
              slimeCA: 0.5,
              smokeCA: 0.5,
              snakeCA: 0.5,
              softCA: 0.5,
              soundCA: 0.5,
              speechCA: 0.5,
              spiderCA: 0.5,
              spiritCA: 0.5,
              stealCA: 0.5,
              steamCA: 0.5,
              stitchCA: 0.5,
              stoneCA: 0.5,
              taijutsuCA: 0.5,
              thunderboltCA: 0.5,
              treeCA: 0.5,
              waterCA: 0.5,
              weaponCA: 0.5,
              wisdomCA: 1,
              combatChoice: 'wisdom'
              })} style={styles.touchCombat}>
              <Image
              source={wisdom} 
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.wisdomCA,
                }}
              />
            </TouchableOpacity>
          </View>
          
            :
            <View></View>
          }
          
          {/* Starting set lists */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <View>
            <Text style={styles.filterHead}>Set List</Text>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 1,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'The Path to Hokage'
              })} style={styles.touchSetList}>
              <Image
              source={set1}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set1Shadow,
                }}
              />
              <Text style={styles.setName}>The Path to Hokage</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 1,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Coils of the snake'
              })} style={styles.touchSetList}>
              <Image
              source={set2}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set2Shadow,
                }}
              />
              <Text style={styles.setName}>Coils of the Snake</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 1,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Curse of the sand'
              })} style={styles.touchSetList}>
              <Image
              source={set3}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set3Shadow,
                }}
              />
              <Text style={styles.setName}>Curse of the Sand</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 1,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Revenge and Rebirth'
              })} style={styles.touchSetList}>
              <Image
              source={set4}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set4Shadow,
                }}
              />
              <Text style={styles.setName}>Revenge and Rebirth</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 1,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Dream Legacy'
              })} style={styles.touchSetList}>
              <Image
              source={set5}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set5Shadow,
                }}
              />
              <Text style={styles.setName}>Dream Legacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 1,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Eternal Rivalry'
              })} style={styles.touchSetList}>
              <Image
              source={set6}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set6Shadow,
                }}
              />
              <Text style={styles.setName}>Eternal Rivalry</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 1,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Quest For Power'
              })} style={styles.touchSetList}>
              <Image
              source={set7}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set7Shadow,
                }}
              />
              <Text style={styles.setName}>Quest for Power</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 1,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Battle of Destiny'
              })} style={styles.touchSetList}>
              <Image
              source={set8}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set8Shadow,
                }}
              />
              <Text style={styles.setName}>Battle of Destiny</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 1,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'The Chosen'
              })} style={styles.touchSetList}>
              <Image
              source={set9}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set9Shadow,
                }}
              />
              <Text style={styles.setName}>The Chosen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 1,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Lineage of the Legends'
              })} style={styles.touchSetList}>
              <Image
              source={set10}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set10Shadow,
                }}
              />
              <Text style={styles.setName}>Lineage of the Legends</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 1,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Approaching Wind'
              })} style={styles.touchSetList}>
              <Image
              source={set11}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set11Shadow,
                }}
              />
              <Text style={styles.setName}>Approaching Wind</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 1,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'A New Chronicle'
              })} style={styles.touchSetList}>
              <Image
              source={set12}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set12Shadow,
                }}
              />
              <Text style={styles.setName}>A New Chronicle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 1,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Fateful Reunion'
              })} style={styles.touchSetList}>
              <Image
              source={set13}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set13Shadow,
                }}
              />
              <Text style={styles.setName}>Fateful Reunion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 1,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Emerging Alliance'
              })} style={styles.touchSetList}>
              <Image
              source={set14}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set14Shadow,
                }}
              />
              <Text style={styles.setName}>Emerging Alliance</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 1,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Foretold Prophecy'
              })} style={styles.touchSetList}>
              <Image
              source={set15}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set15Shadow,
                }}
              />
              <Text style={styles.setName}>Foretold Prophecy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 1,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Broken Promise'
              })} style={styles.touchSetList}>
              <Image
              source={set16}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set16Shadow,
                }}
              />
              <Text style={styles.setName}>Broken Promise</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 1,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Will of Fire'
              })} style={styles.touchSetList}>
              <Image
              source={set17}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set17Shadow,
                }}
              />
              <Text style={styles.setName}>Will of Fire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 1,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Tournament Pack 1'
              })} style={styles.touchSetList}>
              <Image
              source={set18}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set18Shadow,
                }}
              />
              <Text style={styles.setName}>Tournament Pack 1</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 1,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Fangs of the Snake'
              })} style={styles.touchSetList}>
              <Image
              source={set19}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set19Shadow,
                }}
              />
              <Text style={styles.setName}>Fangs of the Snake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 1,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Path of Pain'
              })} style={styles.touchSetList}>
              <Image
              source={set20}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set20Shadow,
                }}
              />
              <Text style={styles.setName}>Path of Pain</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 1,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Tournament Pack 2'
              })} style={styles.touchSetList}>
              <Image
              source={set21}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set21Shadow,
                }}
              />
              <Text style={styles.setName}>Tournament Pack 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 1,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Tales of the Gallant Sage'
              })} style={styles.touchSetList}>
              <Image
              source={set22}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set22Shadow,
                }}
              />
              <Text style={styles.setName}>Tales of the Gallant Sage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 1,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Shattered Truths'
              })} style={styles.touchSetList}>
              <Image
              source={set23}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set23Shadow,
                }}
              />
              <Text style={styles.setName}>Shattered Truth</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 1,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Tournament Pack 3'
              })} style={styles.touchSetList}>
              <Image
              source={set24}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set24Shadow,
                }}
              />
              <Text style={styles.setName}>Tournament Pack 3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 1,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Weapons of War'
              })} style={styles.touchSetList}>
              <Image
              source={set25}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set25Shadow,
                }}
              />
              <Text style={styles.setName}>Weapons of War</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 1,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Invasion'
              })} style={styles.touchSetList}>
              <Image
              source={set26}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set26Shadow,
                }}
              />
              <Text style={styles.setName}>Invasion</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 1,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Tournament Pack 4'
              })} style={styles.touchSetList}>
              <Image
              source={set27}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set27Shadow,
                }}
              />
              <Text style={styles.setName}>Tournament Pack 4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 1,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: "Sage's Legacy"
              })} style={styles.touchSetList}>
              <Image
              source={set28}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set28Shadow,
                }}
              />
              <Text style={styles.setName}>Sage's Legacy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 1,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: 'Kage Summit'
              })} style={styles.touchSetList}>
              <Image
              source={set29}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set29Shadow,
                }}
              />
              <Text style={styles.setName}>Kage Summit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 1,
              set31Shadow: 0.5,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: "Avenger's Wrath"
              })} style={styles.touchSetList}>
              <Image
              source={set30}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set30Shadow,
                }}
              />
              <Text style={styles.setName}>Avenger's Wrath</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setListRow}>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 1,
              set32Shadow: 0.5,
              set33Shadow: 0.5,
              setChoice: "Hero's Ascension"
              })} style={styles.touchSetList}>
              <Image
              source={set31}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set31Shadow,
                }}
              />
              <Text style={styles.setName}>Hero's Ascension</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({
              set1Shadow: 0.5,
              set2Shadow: 0.5,
              set3Shadow: 0.5,
              set4Shadow: 0.5,
              set5Shadow: 0.5,
              set6Shadow: 0.5,
              set7Shadow: 0.5,
              set8Shadow: 0.5,
              set9Shadow: 0.5,
              set10Shadow: 0.5,
              set11Shadow: 0.5,
              set12Shadow: 0.5,
              set13Shadow: 0.5,
              set14Shadow: 0.5,
              set15Shadow: 0.5,
              set16Shadow: 0.5,
              set17Shadow: 0.5,
              set18Shadow: 0.5,
              set19Shadow: 0.5,
              set20Shadow: 0.5,
              set21Shadow: 0.5,
              set22Shadow: 0.5,
              set23Shadow: 0.5,
              set24Shadow: 0.5,
              set25Shadow: 0.5,
              set26Shadow: 0.5,
              set27Shadow: 0.5,
              set28Shadow: 0.5,
              set29Shadow: 0.5,
              set30Shadow: 0.5,
              set31Shadow: 0.5,
              set32Shadow: 1,
              set33Shadow: 0.5,
              setChoice: 'Ultimate Ninja Storm 3'
              })} style={styles.touchSetList}>
              <Image
              source={set32}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                opacity: this.state.set32Shadow,
                }}
              />
              <Text style={styles.setName}>Ultimate Ninja Storm 3</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
let symbolContainerHeight = 70;
let typeContainerHeight = 90;
let combatContainerHeight = 80;
if (Dimensions.get('window').width > 800) {
  // iPad
  combatContainerHeight = '6%';
  symbolContainerHeight = '5%';
  typeContainerHeight = '7%';
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  searchInputContainer: {
    flex: 1/10,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInput: {
    height: 40, 
    borderColor: '#a9a9a9', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flex: 1, 
    textAlign: 'left',
    marginRight: 10,
    fontSize: 17,
    // paddingTop: 20,
    paddingLeft: 2,
  },
  searchInputAlt: {
    height: 40, 
    borderColor: '#a9a9a9', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flex: 1, 
    textAlign: 'left',
    marginRight: 10,
    fontSize: 17,
    marginTop: 20,
    paddingLeft: 2,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: '#2f95dc',
    height: 40,
    color: '#2f95dc',
    flexDirection: 'column',
    padding: 10,
    fontSize: 17,
    borderRadius: 5,
  },
  symbolFilter: {
    // flex: 1/7,
    flexDirection: 'row',
    height: symbolContainerHeight, 
    paddingLeft: 5,
    paddingRight: 5,
  },
  touchSymbol: { 
    flex: 1/6, 
    marginRight: 5
  },
  filterHead: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  typeContainer: {
    height: typeContainerHeight,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  touchType: { 
    flex: 1/4, 
    marginRight: 5
  },
  combatContainer: {
    height: combatContainerHeight,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  touchCombat: {
    flex: 1/5,
    marginRight: 5
  },
  setListRow: {
    flexDirection: 'row',
    height: 120,
    paddingLeft: 0,
    paddingRight: 0,
  },
  touchSetList: {
    flex: 1/2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  exclusiveSetListRow: {
    flexDirection: 'row',
    height: 210,
    paddingLeft: 0,
    paddingRight: 0,
  },
  exclusiveSetList: {
    flex: 1,
    marginLeft: 6,
    marginRight: 5,
    marginTop:10,
    marginBottom: 5, 
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: 'black', 
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  exclusiveSetName: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: 'center',
    color: 'white'
    // marginTop: 5,
  },
  setName: {
    fontSize: 15,
    marginLeft: 10,
    // marginTop: 5,
  },
});

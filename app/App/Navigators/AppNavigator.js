import { createAppContainer, createStackNavigator } from 'react-navigation'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import LoginScreen from 'App/Containers/LoginScreen/LoginScreen'
import SignupScreen from 'App/Containers/SignupScreen/SignupScreen'
import HomeScreen from 'App/Containers/HomeScreen/HomeScreen'
import CreateGameScreen from 'App/Containers/CreateGameScreen/CreateGameScreen'
import ChatScreen from 'App/Containers/ChatScreen/ChatScreen'
import ProfileScreen from 'App/Containers/ProfileScreen/ProfileScreen'
import RulesScreen from 'App/Containers/RulesScreen/RulesScreen'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    MainScreen: LoginScreen,
    Signup: SignupScreen,
    Home: HomeScreen,
    CreateGame: CreateGameScreen,
    ChatScreen: ChatScreen,
    Profile: ProfileScreen,
    Rules: RulesScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)

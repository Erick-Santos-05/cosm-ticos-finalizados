const submit = document.getElementById('submit');
const baseURL = "http://localhost:8000/";

function checkAge() {
  const input = document.getElementById("idBirthDate");
  const birthDateValue = input.value;

  if (!birthDateValue) {
    document.getElementById("ageMessage").innerText = "Por favor, insira uma data de nascimento.";
    return false;
  }

  const birthDate = new Date(birthDateValue);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    document.getElementById("ageMessage").innerText = "Você deve ter pelo menos 18 anos.";
    return false;
  } else {
    document.getElementById("ageMessage").innerText = "";
  }
  
  return true;
}

function updateCities() {
  const state = document.getElementById("state").value;
  const cities = {
    SP: ["São Paulo", "Campinas", "Santos"],
    RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
    MG: ["Belo Horizonte", "Nova Lima", "Ouro Preto"],
    ES: ["Vitória", "Vila Velha", "Serra"],
  };
  const citySelect = document.getElementById("idCity");
  citySelect.innerHTML = "<option value=''>Selecione uma cidade</option>";
  if (state) {
    cities[state].forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.text = city;
      citySelect.add(option);
    });
    citySelect.disabled = false;
  } else {
    citySelect.disabled = true;
  }
}

submit.addEventListener('click', (e) =>{
  e.preventDefault();

  const nomeInput = document.getElementById('idNome');
  const emailInput = document.getElementById('idEmail');
  const telefoneInput = document.getElementById('idTelefone');
  const data_nascimentoInput = document.getElementById('idBirthDate');
  const estadoInput = document.getElementById('state');
  const cidadeInput = document.getElementById('idCity');
  const produtoInput = document.getElementById('idProduto');
  const marcaInput = document.getElementById('idMarca');
  const mensagemInput = document.getElementById('message');

  const nome = nomeInput.value;
  const email = emailInput.value;
  const telefone = telefoneInput.value.replace(/[\D]/g, '');
  const data_nascimento = data_nascimentoInput.value;
  const estado = estadoInput.value;
  const cidade = cidadeInput.value;
  const produto = produtoInput.value;
  const marca = marcaInput.value;
  const mensagem = mensagemInput.value;

  checkAge();
  if(!checkAge()){
    return
  }
  
  if (!nome || !email || !telefone || !data_nascimento || !estado || !cidade || !produto || !marca || !mensagem){
    alert('Por favor preencha todos os campos.')
    return
  }

  nomeInput.value = '';
  emailInput.value = '';
  telefoneInput.value = '';
  data_nascimentoInput.value = '';
  estadoInput.value = '';
  cidadeInput.value = '';
  produtoInput.value = '';
  marcaInput.value = '';
  mensagemInput.value = '';

  post(nome, email, telefone, data_nascimento, estado, cidade, produto, marca, mensagem);
})

const post = async (nome, email, telefone, data_nascimento, estado, cidade, produto, marca, mensagem) => {
  try {
      const response = await axios.post(baseURL, {
        nome, 
        email, 
        telefone, 
        data_nascimento,
        estado, cidade, 
        produto, 
        marca, 
        mensagem
      });

      alert('Mensagem registrada com sucesso!');
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      alert('Erro ao cadastrar: ' + err.response.data.message);
  } else {
      alert('Erro ao cadastrar: ' + err.message);
  }
  }
};
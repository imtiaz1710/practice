import { Component, OnInit } from '@angular/core';
import { Fine } from 'src/app/models/fine';
import { Team } from 'src/app/models/team';
import { Transaction } from 'src/app/models/transaction';
import { UserTeam } from 'src/app/models/user-team';
import { FineService } from 'src/app/services/fine.service';
import { MyProfileService } from 'src/app/services/my-profile.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[];
  userTeams: UserTeam[];
  myTeams: Team[];
  usersOfmySelectedTeam: User[];
  transactions: Transaction[];
  fines: Fine[];
  rows = [];
  filteredUserTeams: UserTeam[];
  filteredFines: Fine[];
  filteredTransactions: Transaction[];
  filteredUser: User;

  constructor(private userService: UserService,
    private userTeamService: UserTeamService,
    private myProfileService: MyProfileService,
    private transactionService: TransactionService,
    private fineService: FineService) { }
    
  ngOnInit(): void {
    this.myProfileService
      .getMyTeamsPromise()
      .then((teams) => (this.myTeams = teams))
      .catch((err) => console.log(err));

    this.userService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.log(err),
    });

    this.userTeamService.getAllUserTeams().subscribe({
      next: (userTeams) => (this.userTeams = userTeams),
      error: (err) => console.log(err),
    });

    this.fineService.getAllFines().subscribe({
      next: (fines) => (this.fines = fines),
      error: (err) => console.log(err),
    });

    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => (this.transactions = transactions),
      error: (err) => console.log(err),
    });
  }

  LoadUserTeamsByTeamId(teamId: number){
    this.filteredUserTeams = this.userTeams.filter(ut => ut.teamId == teamId);
  }

  LoadUserByUserTeam(userTeam: UserTeam)
  {
    this.filteredUser = this.users.find(u => u.id == userTeam.userId);
  }

  LoadFinesByUserTeamId(userTeamId: number)
  {
    this.filteredFines = this.fines.filter(f => f.userTeamId == userTeamId);
  }

  LoadTransactionsByUserTeamId(userTeamId: number)
  {
    this.filteredTransactions = this.transactions.filter(tn => tn.userTeamId == userTeamId);
  }
}
